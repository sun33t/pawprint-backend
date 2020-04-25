const connection = require('../db/connection')

exports.fetchQuestions = (category) => {
  return connection('questions')
    .select('*')
    .from('questions')
    .orderBy('questions.category')
    .modify((query) => {
      if (category) query.where('questions.category', category)
    })
    .then((query) => {
      const totalQuestions = this.fetchNumberoftotalQuestions()
      return Promise.all([totalQuestions, query])
    })
    .then(([totalQuestions, query]) => {
      return {
        totalQuestions,
        questionsInCategory: query.length,
        questions: query,
      }
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

exports.fetchNumberoftotalQuestions = () => {
  return connection('questions')
    .select('*')
    .from('questions')
    .then((questions) => {
      return questions.length
    })
}
