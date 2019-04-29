const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const authRouter = require('./routes/auth-v1')
const authModel = require('./model/auth')

const alertsRouter = require('./routes/alerts-v1')
const alertsModel = require('./model/alerts')

const db = require('./database')

const app = express()

app.use(bodyParser.json())

// Activation de Helmet
app.use(helmet({noSniff: true}))

//Check the token for all requests
app.use(authModel.checkToken)
// On injecte le model dans les routers. Ceci permet de supprimer la dépendance
// directe entre les routers et le modele
app.use('/v1/alerts', alertsRouter(alertsModel))
app.use('/v1/auth', authRouter(authModel))

// For unit tests
exports.app = app