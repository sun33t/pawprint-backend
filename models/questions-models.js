const connection = require('../db/connection')
const { fetchAnswers, addAnswers } = require('./answers-models')
const { formatAnswers } = require('../utils/utils')

exports.fetchQuestions = (category) => {
  return connection('questions')
    .select('*')
    .from('questions')
    .orderBy('questions.category')
    .modify((query) => {
      if (category) query.where('questions.category', category)
    })
    .then((questions) => {
      return Promise.all(
        questions.map((question) => {
          return fetchAnswers(question.question_id)
        })
      )
    })
    .then((answers) => {
      const newQuestions = connection('questions')
        .select('*')
        .from('questions')
        .orderBy('questions.category')
        .modify((query) => {
          if (category) query.where('questions.category', category)
        })
        .returning('*')

      return Promise.all([newQuestions, answers])
    })
    .then(([newQuestions, answers]) => {
      newQuestions.map((question) => {
        answers.forEach((answerArray) => {
          if (question.question_id === answerArray[0].question_id) {
            question.answers = answerArray
          }
        })
      })
      const totalQuestions = this.fetchNumberoftotalQuestions()
      return Promise.all([totalQuestions, newQuestions])
    })
    .then(([totalQuestions, newQuestions]) => {
      const questions = {
        totalQuestions,
        questionsInCategory: newQuestions.length,
        questions: newQuestions,
      }
      return { questions }
    })
}

exports.addQuestion = (newQuestion) => {
  const {
    option_1,
    option_2,
    option_3,
    option_4,
    ...questionToAdd
  } = newQuestion

  return connection('questions')
    .insert(questionToAdd)
    .returning('*')
    .then((response) => {
      const [addedQuestion] = response
      const formattedAnswers = formatAnswers([newQuestion], {
        [addedQuestion.question_text]: addedQuestion.question_id,
      })
      const insertedAnswers = addAnswers(formattedAnswers)
      return Promise.all([insertedAnswers, addedQuestion])
    })
    .then(([insertedAnswers, addedQuestion]) => {
      const question = { ...addedQuestion, answers: insertedAnswers }

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
