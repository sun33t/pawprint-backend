const { fetchQuestions } = require('../models/questions-models')

const sendQuestions = (req, res, next) => {
  fetchQuestions().then((questions) => {
    res.status(200).send(questions)
  })
}

module.exports = { sendQuestions }
