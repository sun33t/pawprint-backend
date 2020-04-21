const { questionData, categoryData } = require('../data/index')

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('categories').insert(categoryData)
    })
    .then(() => {
      return knex('questions').insert(questionData)
    })
}
