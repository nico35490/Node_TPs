/*
    Page web : File info
*/

const http = require('http')
const debug = require('debug')('tp2-server')
const lib = require('./lib.js')
const port = 8000
const path = './node_modules'

debug('Booting')

// Configure our HTTP server
const server = http.createServer((req, res) => {
    debug(`Request received ${req.method} ${req.url}`)
    res.writeHead(200, {"Content-Type": "application/json"})
    lib.filesDetails(path, (err, result)=>{
        if(err){
            console.error(err)
        } else {
            res.end(JSON.stringify(result));
        }
    });
})

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(port)

// Server ready
debug(`Server running at http://127.0.0.1:${port}/`)