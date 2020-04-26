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

exports.addAnswers = (answers) => {
  return connection('answers')
    .insert(answers)
    .returning('*')
    .then((addedAnswers) => {
      return addedAnswers
    })
}
