const connection = require('../db/connection')

exports.fetchQuestions = (category) => {
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

exports.addQuestion = (newQuestion) => {
  return connection('questions')
    .insert(newQuestion)
    .returning('*')
    .then((response) => {
      const [question] = response
      return { question }
    })
}
