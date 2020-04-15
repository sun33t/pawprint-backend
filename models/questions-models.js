const connection = require('../db/connection')

const fetchQuestions = (category) => {
  return connection('questions')
    .select('*')
    .from('questions')
    .modify((query) => {
      if (category) query.where('questions.category', category)
    })
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
