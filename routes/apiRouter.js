const apiRouter = require('express').Router()
const { sendEndpoints } = require('../controllers/api-controllers')
const { methodNotAllowed } = require('../errors/index')

apiRouter.route('/').get(sendEndpoints).all(methodNotAllowed)

module.exports = { apiRouter }
