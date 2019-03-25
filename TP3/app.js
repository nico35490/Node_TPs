/*
    Page web : File info
*/
const express = require('express')
const bodyParser = require('body-parser')

const usersRouter = require("./routes/users")

const debug = require('debug')('tp3-server')

const app = express()
const port = 3000

debug('Booting')

app.use(bodyParser.json())
app.use('/v1/users', usersRouter)

// Listen on port, IP defaults to 127.0.0.1
app.listen(port)
// Server ready
debug(`Server running at http://127.0.0.1:${port}/`)