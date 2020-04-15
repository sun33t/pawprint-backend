const apiRouter = require('express').Router()
const { sendEndpoints } = require('../controllers/api-controllers')

apiRouter.route('/').get(sendEndpoints)

module.exports = { apiRouter }
