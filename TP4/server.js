// Import du nouveau module app
const {app} = require('./app')

// Lancement du server (qui était auparavant dans app.js)
const port = process.env.PORT || '3000'
app.listen(port)