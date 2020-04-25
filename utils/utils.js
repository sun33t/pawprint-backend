const { questionData } = require('../db/data/test-data/index')

exports.formatQuestions = (questions) => {
  return questions.map(({ category, question_text }) => {
    return { category, question_text }
  })
}

exports.formatAnswers = (questions, refObj) => {
  const formattedAnswers = []

  questions.forEach((question) => {
    const answerArray = ['option_1', 'option_2', 'option_3', 'option_4']
    answerArray.forEach((answer, index) => {
      formattedAnswers.push({
        question_id: refObj[question.question_text],
        position: index + 1,
        answer_text: question[answerArray[index]].text,
        score: question[answerArray[index]].score,
      })
    })
  })
  return formattedAnswers
}

exports.makeRefObj = (list, itemToBeKey, itemToBeValue) => {
  const refObj = {}
  list.forEach((question) => {
    refObj[question[itemToBeKey]] = question[itemToBeValue]
  })
  return refObj
}
