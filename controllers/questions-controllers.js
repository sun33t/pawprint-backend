const { fetchQuestions, addQuestion } = require('../models/questions-models')

const sendQuestions = (req, res, next) => {
  const { category } = req.query
  fetchQuestions(category).then((questions) => {
    res.status(200).send(questions)
  })
}

const postQuestion = (req, res, next) => {
  const questionsToAdd = req.body
  addQuestion(questionsToAdd)
    .then((question) => {
      res.status(201).send(question)
    })
    .catch(next)
}

module.exports = { sendQuestions, postQuestion }
