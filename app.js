const express = require('express')
const cors = require('cors')
const app = express()
const { apiRouter } = require('./routes/apiRouter')
const { routeNotFound } = require('./errors/')

app.use(cors())
app.use(express.json())

app.use('/api', apiRouter)
app.all('/*', routeNotFound)

module.exports = app
