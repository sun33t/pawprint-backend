const apiRouter = require('express').Router()
const { questionsRouter } = require('./questionsRouter')
const { sendEndpoints } = require('../controllers/api-controllers')
const { methodNotAllowed } = require('../errors/index')

apiRouter.route('/').get(sendEndpoints).all(methodNotAllowed)

apiRouter.use('/questions', questionsRouter)

module.exports = { apiRouter }
