const questionsRouter = require('express').Router()
const { methodNotAllowed } = require('../errors/index')
const {
  sendQuestions,
  postQuestion,
} = require('../controllers/questions-controllers')

questionsRouter
  .route('/')
  .get(sendQuestions)
  .post(postQuestion)
  .all(methodNotAllowed)

module.exports = { questionsRouter }
