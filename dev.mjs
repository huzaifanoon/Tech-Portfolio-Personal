import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Automatically load environment variables from .env.local or .env
for (const envFile of ['.env.local', '.env']) {
    const envPath = path.join(__dirname, envFile);
    if (fs.existsSync(envPath)) {
        const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
        for (const line of lines) {
            const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
            if (match && !process.env[match[1]]) {
                process.env[match[1]] = match[2].trim();
            }
        }
        console.log(`✅ Loaded environment variables from ${envFile}`);
        break;
    }
}

// 2. Start Local Development Server
const START_PORT = Number(process.env.PORT || 8080);
const server = http.createServer(async (req, res) => {
    // Route 1: Handle Vercel Serverless Endpoint (/api/chat)
    if (req.url === '/api/chat' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            try {
                const parsedBody = JSON.parse(body || '{}');
                // Dynamically import our Vercel serverless handler
                const { default: handler } = await import('./api/chat.js');
                
                // Create Vercel-compatible req/res wrapper
                const mockReq = { method: req.method, body: parsedBody, headers: req.headers };
                const mockRes = {
                    status: (code) => {
                        res.statusCode = code;
                        return {
                            json: (data) => {
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify(data));
                            }
                        };
                    }
                };
                await handler(mockReq, mockRes);
            } catch (err) {
                console.error('Error handling /api/chat:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // Route 2: Serve Static Portfolio Files (index.html, styles.css, script.js, etc.)
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(__dirname, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.mjs': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    };

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
            res.end(content, 'utf-8');
        }
    });
});

function listen(port) {
    server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            listen(port + 1);
            return;
        }
        throw err;
    });

    server.listen(port, () => {
        console.log(`\nLocal portfolio server running at: http://localhost:${port}/`);
        console.log(`AI chat endpoint active at: http://localhost:${port}/api/chat\n`);
    });
}

listen(START_PORT);
