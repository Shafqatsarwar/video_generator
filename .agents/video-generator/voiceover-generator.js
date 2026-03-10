// Voiceover Generator using Local Windows TTS
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Generate voiceover audio from text using local Windows TTS
 * @param {string} text - The script text to convert to speech
 * @param {string} outputPath - Path to save the wav file
 * @returns {Promise<string>} - Path to the generated audio file
 */
async function generateVoiceover(text, outputPath) {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, 'local-tts.ps1');

        // Use spawn to correctly pass arguments with spaces
        const ps = spawn('powershell.exe', [
            '-ExecutionPolicy', 'Bypass',
            '-File', scriptPath,
            text,
            outputPath
        ]);

        let stderr = '';
        ps.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        ps.on('close', (code) => {
            if (code !== 0) {
                console.error(`Local TTS Error (Code ${code}): ${stderr}`);
                return reject(new Error(`Local TTS failed with code ${code}: ${stderr}`));
            }

            if (fs.existsSync(outputPath)) {
                resolve(outputPath);
            } else {
                reject(new Error(`Failed to generate local TTS file: No file at ${outputPath}`));
            }
        });
    });
}

module.exports = { generateVoiceover };
