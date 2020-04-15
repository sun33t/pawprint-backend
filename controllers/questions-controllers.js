const { fetchQuestions, addQuestion } = require('../models/questions-models')

const sendQuestions = (req, res, next) => {
  fetchQuestions().then((questions) => {
    res.status(200).send(questions)
  })
}

const postQuestion = (req, res, nest) => {
  const questionsToAdd = req.body
  addQuestion(questionsToAdd).then((question) => {
    res.status(201).send(question)
  })
}

module.exports = { sendQuestions, postQuestion }
