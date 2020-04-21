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

exports.removeQuestion = (question_id) => {
  return connection('questions')
    .where('question_id', question_id)
    .del()
    .then((response) => {
      return response === 0
        ? Promise.reject({
            status: 404,
            msg: `question with question_id: ${question_id} does not exist`,
          })
        : true
    })
}
