const {
  fetchQuestions,
  addQuestion,
  removeQuestion,
} = require('../models/questions-models')

exports.sendQuestions = (req, res, next) => {
  const { category } = req.query
  fetchQuestions(category).then((questions) => {
    res.status(200).send(questions)
  })
}

exports.postQuestion = (req, res, next) => {
  const questionsToAdd = req.body
  addQuestion(questionsToAdd)
    .then((question) => {
      res.status(201).send(question)
    })
    .catch(next)
}

exports.deleteQuestion = (req, res, next) => {
  const { question_id } = req.query
  removeQuestion(question_id)
    .then(() => {
      res.sendStatus(204)
    })
    .catch(next)
}
