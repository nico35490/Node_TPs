const http = require('http') 
const fs = require('fs')
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    res.end(JSON.stringify(fs.readdirSync("./")));
})
server.listen(8000) // Port d'écoute