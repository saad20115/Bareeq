// Simple zero-dependency HTTP server for Bareeq Admin Dashboard + Mobile Preview
// Usage: node serve.js
// Admin:  http://localhost:3075
// Mobile: http://localhost:3075/mobile/

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3075;
const ADMIN_DIR = __dirname;
const PROJECT_DIR = path.join(__dirname, '..');

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.jsx': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
};

const server = http.createServer((req, res) => {
    let url = req.url.split('?')[0];

    let filePath;

    if (url.startsWith('/mobile')) {
        // Serve mobile app from project root /mobile/
        const mobilePath = url === '/mobile' || url === '/mobile/' ? '/mobile/index.html' : url;
        filePath = path.join(PROJECT_DIR, mobilePath);
    } else {
        // Serve admin dashboard
        if (url === '/') url = '/index.html';
        filePath = path.join(ADMIN_DIR, url);
    }

    // Security: prevent directory traversal
    if (!filePath.startsWith(PROJECT_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>404 — الصفحة غير موجودة</h1>');
            return;
        }
        const ext = path.extname(filePath).toLowerCase();
        const mime = MIME[ext] || 'application/octet-stream';
        res.writeHead(200, {
            'Content-Type': mime,
            'Cache-Control': 'no-cache',
        });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`\n  🚗  بريق X — لوحة التحكم`);
    console.log(`  ✅  Admin:  http://localhost:${PORT}`);
    console.log(`  📱  Mobile: http://localhost:${PORT}/mobile/\n`);
});
