const { questionData } = require('../db/data/test-data/index')

exports.formatQuestions = (questions) => {
  return questions.map(({ category, question_text }) => {
    return { category, question_text }
  })
}
