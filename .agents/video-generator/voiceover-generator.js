const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const https = require('https');

/**
 * Generate voiceover audio from text using one of the available providers
 * @param {string} text - The script text to convert to speech
 * @param {string} outputPath - Path to save the file
 * @param {Object} options - Provider and voice options
 * @returns {Promise<string>} - Path to the generated audio file
 */
async function generateVoiceover(text, outputPath, options = {}) {
    const provider = options.provider || 'local';
    const voice = options.voice || (options.gender === 'Male' ? 'en-GB-RyanNeural' : 'en-GB-SoniaNeural');

    console.log(`      Generating voiceover using ${provider} (${voice})...`);

    if (provider === 'elevenlabs' && process.env.ELEVENLABS_API_KEY) {
        return generateElevenLabs(text, outputPath, voice);
    } else if (provider === 'openai' && process.env.OPENAI_API_KEY) {
        return generateOpenAI(text, outputPath, voice);
    } else {
        // Fallback to local Windows TTS
        const gender = options.gender || (voice.toLowerCase().includes('male') ? 'Male' : 'Female');
        return generateLocalTTS(text, outputPath, gender);
    }
}

/**
 * Local Windows TTS via PowerShell
 */
async function generateLocalTTS(text, outputPath, gender) {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, 'local-tts.ps1');
        const ps = spawn('powershell.exe', [
            '-ExecutionPolicy', 'Bypass',
            '-File', scriptPath,
            text,
            outputPath,
            gender
        ]);

        let stderr = '';
        ps.stderr.on('data', (data) => stderr += data.toString());

        ps.on('close', (code) => {
            if (code !== 0) return reject(new Error(`Local TTS failed: ${stderr}`));
            if (fs.existsSync(outputPath)) resolve(outputPath);
            else reject(new Error(`Failed to generate local TTS file at ${outputPath}`));
        });
    });
}

/**
 * ElevenLabs TTS API
 */
async function generateElevenLabs(text, outputPath, voiceId) {
    return new Promise((resolve, reject) => {
        const voice = voiceId || '21m00Tcm4TlvDq8ikWAM'; // Default Rachel
        const postData = JSON.stringify({
            text: text,
            model_id: "eleven_multilingual_v2",
            voice_settings: { stability: 0.5, similarity_boost: 0.75 }
        });

        const req = https.request({
            hostname: 'api.elevenlabs.io',
            path: `/v1/text-to-speech/${voice}`,
            method: 'POST',
            headers: {
                'xi-api-key': process.env.ELEVENLABS_API_KEY,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, (res) => {
            if (res.statusCode !== 200) return reject(new Error(`ElevenLabs API returned ${res.statusCode}`));
            const file = fs.createWriteStream(outputPath);
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(outputPath);
            });
        });

        req.on('error', (e) => reject(e));
        req.write(postData);
        req.end();
    });
}

/**
 * OpenAI TTS API
 */
async function generateOpenAI(text, outputPath, voiceId) {
    return new Promise((resolve, reject) => {
        const voice = voiceId || 'alloy';
        const postData = JSON.stringify({
            model: "tts-1",
            input: text,
            voice: voice
        });

        const req = https.request({
            hostname: 'api.openai.com',
            path: '/v1/audio/speech',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, (res) => {
            if (res.statusCode !== 200) return reject(new Error(`OpenAI API returned ${res.statusCode}`));
            const file = fs.createWriteStream(outputPath);
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(outputPath);
            });
        });

        req.on('error', (e) => reject(e));
        req.write(postData);
        req.end();
    });
}

/**
 * Get the duration of an audio file in seconds
 */
async function getAudioDuration(filePath) {
    return new Promise((resolve) => {
        const ffmpeg = require('ffmpeg-static');
        exec(`"${ffmpeg}" -i "${filePath}"`, (error, stdout, stderr) => {
            const match = /Duration: (\d{2}):(\d{2}):(\d{2})\.(\d{2})/.exec(stderr);
            if (match) {
                const hours = parseInt(match[1]);
                const minutes = parseInt(match[2]);
                const seconds = parseInt(match[3]);
                const centiseconds = parseInt(match[4]);
                resolve(hours * 3600 + minutes * 60 + seconds + centiseconds / 100);
            } else {
                resolve(0);
            }
        });
    });
}

module.exports = { generateVoiceover, getAudioDuration };
