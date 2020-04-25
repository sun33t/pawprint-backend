const { questionData } = require('../db/data/test-data/index')

exports.formatQuestions = (questions) => {
  return questions.map(({ category, question_text }) => {
    return { category, question_text }
  })
}

exports.formatAnswers = (questions) => {
  return []
}

exports.makeRefObj = (list, itemToBeKey, itemToBeValue) => {
  const refObj = {}
  list.forEach((question) => {
    refObj[question[itemToBeKey]] = question[itemToBeValue]
  })
  return refObj
}
