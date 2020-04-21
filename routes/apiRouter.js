const apiRouter = require('express').Router()
const { questionsRouter } = require('./questionsRouter')
const { categoriesRouter } = require('./categoriesRouter')
const { sendEndpoints } = require('../controllers/api-controllers')
const { methodNotAllowed } = require('../errors/index')

apiRouter.route('/').get(sendEndpoints).all(methodNotAllowed)

apiRouter.use('/questions', questionsRouter)
apiRouter.use('/categories', categoriesRouter)

module.exports = apiRouter
