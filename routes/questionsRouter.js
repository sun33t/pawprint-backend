const questionsRouter = require('express').Router()
const { methodNotAllowed } = require('../errors/index')
const {
  sendQuestions,
  postQuestion,
  deleteQuestion,
} = require('../controllers/questions-controllers')

questionsRouter
  .route('/')
  .get(sendQuestions)
  .post(postQuestion)
  .delete(deleteQuestion)
  .all(methodNotAllowed)

module.exports = { questionsRouter }
