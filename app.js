const express = require('express')
const cors = require('cors')
const app = express()
const { apiRouter } = require('./routes/apiRouter')
const {
  routeNotFound,
  psqlErrorHandler,
  serverErrorHandler,
} = require('./errors/')

app.use(cors())
app.use(express.json())

app.use('/api', apiRouter)
app.all('/*', routeNotFound)

app.use(psqlErrorHandler)
app.use(serverErrorHandler)

module.exports = app
