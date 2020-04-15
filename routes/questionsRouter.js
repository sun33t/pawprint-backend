const questionsRouter = require('express').Router()
const { sendQuestions } = require('../controllers/questions-controllers')

questionsRouter.route('/').get(sendQuestions)

module.exports = { questionsRouter }
