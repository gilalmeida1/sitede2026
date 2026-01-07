const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8080; // Porta do front-end
const PUBLIC_DIR = path.join(__dirname); // Pasta dos arquivos HTML

const server = http.createServer((req, res) => {
    // Remove parâmetros da query (ex.: ?v=2)
    const parsedUrl = url.parse(req.url);
    let filePath = path.join(PUBLIC_DIR, parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);

    // Define a extensão do arquivo
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    // Define o tipo de conteúdo com base na extensão
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
    }

    // Não adiciona .html automaticamente se já tiver extensão
    if (!extname) {
        // Verifica se o arquivo existe sem extensão
        if (fs.existsSync(filePath)) {
            // Se for um diretório, tenta servir index.html
            if (fs.lstatSync(filePath).isDirectory()) {
                filePath = path.join(filePath, 'index.html');
            }
        } else {
            // Tenta adicionar .html
            filePath += '.html';
        }
    }

    // Lê o arquivo e envia a resposta
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Arquivo não encontrado</h1>');
            } else {
                res.writeHead(500);
                res.end('Erro no servidor');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Servidor front-end rodando em http://localhost:${PORT}`);
});