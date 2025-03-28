import http from 'http';
import fs from 'fs/promises';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 4000;

// Ensure camera directory exists
const cameraDir = path.join(__dirname, 'camera');
async function ensureCameraDir() {
    try {
        await fs.mkdir(cameraDir, { recursive: true });
    } catch (err) {
        console.error('Error creating camera directory:', err);
    }
}
await ensureCameraDir();

// Configuration
const config = {
    rtspUrl: 'rtsp://192.168.1.7:8080/h264_ulaw.sdp',//rtsp://192.168.1.5?user=admin&passwpord=234&channel=1
    outputDir: cameraDir,
    segmentLength: 2,
    listSize: 10,
    maxRestarts: 10,
    restartDelay: 5000, // 5 seconds
};

let restartCount = 0;
let ffmpegProcess = null;

function startFFmpeg() {
    console.log(`Starting FFmpeg stream (attempt ${restartCount + 1})...`);

    const args = [
        '-fflags', '+genpts',
        '-rtsp_transport', 'tcp',
        '-i', config.rtspUrl,
        '-c:v', 'copy',
        '-c:a', 'copy',
        '-f', 'hls',
        '-hls_time', config.segmentLength.toString(),
        '-hls_list_size', config.listSize.toString(),
        '-hls_flags', 'delete_segments',
        '-hls_segment_filename', path.join(config.outputDir, 'output%03d.ts'),
        path.join(config.outputDir, 'output.m3u8')
    ];

    ffmpegProcess = spawn('ffmpeg', args);

    ffmpegProcess.stdout.on('data', (data) => {
        console.log(`FFmpeg stdout: ${data}`);
    });

    ffmpegProcess.stderr.on('data', (data) => {
        // FFmpeg logs to stderr by default
        const output = data.toString();

        // Only log errors or important messages
        if (output.includes('Error') || output.includes('error') || output.includes('failed')) {
            console.error(`FFmpeg stderr: ${output}`);
        }
    });

    ffmpegProcess.on('close', (code) => {
        console.log(`FFmpeg process exited with code ${code}`);

        if (code !== 0) {
            handleFFmpegFailure();
        }
    });

    ffmpegProcess.on('error', (err) => {
        console.error(`FFmpeg process error: ${err.message}`);
        handleFFmpegFailure();
    });
}

function handleFFmpegFailure() {
    restartCount++;

    if (restartCount < config.maxRestarts) {
        console.log(`FFmpeg failed. Restarting in ${config.restartDelay / 1000} seconds...`);
        setTimeout(startFFmpeg, config.restartDelay);
    } else {
        console.error(`Maximum restart attempts (${config.maxRestarts}) reached. Giving up.`);
        process.exit(1);
    }
}

// Graceful Shutdown
function shutdownHandler(signal) {
    console.log(`Received ${signal}. Shutting down FFmpeg...`);
    if (ffmpegProcess) {
        ffmpegProcess.kill('SIGTERM');
    }
    process.exit(0);
}
process.on('SIGINT', () => shutdownHandler('SIGINT'));
process.on('SIGTERM', () => shutdownHandler('SIGTERM'));

// HTTP Server
const server = http.createServer(async (request, response) => {
    console.log('Request received:', request.url, new Date());

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
    };

    if (request.method === 'OPTIONS') {
        response.writeHead(204, headers);
        response.end();
        return;
    }

    let filePath = path.join(cameraDir, request.url);
    console.log('Serving file:', filePath);

    try {
        const content = await fs.readFile(filePath);
        response.writeHead(200, headers);
        response.end(content, 'utf-8');
    } catch (error) {
        if (error.code === 'ENOENT') {
            try {
                const notFoundContent = await fs.readFile('./404.html');
                response.writeHead(404, headers);
                response.end(notFoundContent, 'utf-8');
            } catch (err) {
                response.writeHead(500, headers);
                response.end('Error loading 404 page.');
            }
        } else {
            response.writeHead(500, headers);
            response.end(`Server Error: ${error.code}`);
        }
    }
});

server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));

// Start the FFmpeg process
startFFmpeg();
console.log('Monitoring FFmpeg process. Press Ctrl+C to stop.');
