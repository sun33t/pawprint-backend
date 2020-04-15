const questionsRouter = require('express').Router()
const {
  sendQuestions,
  postQuestion,
} = require('../controllers/questions-controllers')

questionsRouter.route('/').get(sendQuestions).post(postQuestion)

module.exports = { questionsRouter }
