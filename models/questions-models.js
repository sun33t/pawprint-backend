const connection = require('../db/connection')

const fetchQuestions = () => {
  return connection
    .select('*')
    .from('questions')
    .then((questions) => {
      return { questions }
    })
}

module.exports = { fetchQuestions }
