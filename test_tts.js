
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function testTTS() {
    const text = "This is a test of the Excellence Links local voiceover system. It should be working now.";
    const outputPath = path.join(__dirname, 'test_voiceover.wav');
    const scriptPath = path.join(__dirname, '.agents', 'video-generator', 'local-tts.ps1');

    console.log(`Script Path: ${scriptPath}`);
    console.log(`Output Path: ${outputPath}`);

    return new Promise((resolve, reject) => {
        // First attempt: Without manual quotes (Node/Windows usually handles this)
        const ps = spawn('powershell.exe', [
            '-ExecutionPolicy', 'Bypass',
            '-File', scriptPath,
            text,
            outputPath
        ]);

        let stderr = '';
        let stdout = '';
        ps.stderr.on('data', (data) => {
            stderr += data.toString();
        });
        ps.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        ps.on('close', (code) => {
            console.log(`Exit code: ${code}`);
            console.log(`STDOUT: ${stdout}`);
            console.log(`STDERR: ${stderr}`);
            if (code === 0 && fs.existsSync(outputPath)) {
                console.log("SUCCESS: Voiceover generated.");
                resolve();
            } else {
                console.log("FAILURE: Voiceover not generated.");
                resolve();
            }
        });
    });
}

testTTS();
