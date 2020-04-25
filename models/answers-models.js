const connection = require('../db/connection')

exports.fetchAnswers = (question_id) => {
  return connection('answers')
    .select('*')
    .from('answers')
    .where('question_id', question_id)
    .then((answers) => {
      return answers
    })
}
