const connection = require('../db/connection')

const fetchQuestions = () => {
  return connection('questions')
    .select('*')
    .from('questions')
    .then((questions) => {
      return { questions }
    })
}

const addQuestion = (newQuestion) => {
  return connection('questions')
    .insert(newQuestion)
    .returning('*')
    .then((response) => {
      const question = response[0]
      return { question }
    })
}

module.exports = { fetchQuestions, addQuestion }
