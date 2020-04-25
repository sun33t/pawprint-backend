const { questionData, categoryData } = require('../data/index')
const {
  formatAnswers,
  formatQuestions,
  makeRefObj,
} = require('../../utils/utils')

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('categories').insert(categoryData)
    })
    .then(() => {
      const formattedQuestions = formatQuestions(questionData)

      return knex('questions').insert(formattedQuestions).returning('*')
    })
    .then((formattedQuestions) => {
      const refObj = makeRefObj(
        formattedQuestions,
        'question_text',
        'question_id'
      )
      const formattedAnswers = formatAnswers(questionData, refObj)

      return knex('answers').insert(formattedAnswers)
    })
}
