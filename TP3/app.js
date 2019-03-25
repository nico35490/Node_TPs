/*
    Page web : File info
*/
var express = require('express')
var app = express()
const debug = require('debug')('tp3-server')
const port = 3000

debug('Booting')

app.get('/', function (req, res) {
	debug(`Request received ${req.method} ${req.url}`)
	res.status(200)
	res.json("H")
})

// Listen on port, IP defaults to 127.0.0.1
app.listen(port)
// Server ready
debug(`Server running at http://127.0.0.1:${port}/`)