const http = require('http') 
const fs = require('fs')
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    let dict = {};
    let files = fs.readdirSync("./");
    for (file in files){
        dict[files[file]] = fs.statSync(files[file]);
    }
    res.end(JSON.stringify(dict));
})
server.listen(8000) // Port d'écoute