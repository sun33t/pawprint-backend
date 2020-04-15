const questionData = require('../data/index')

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('questions').insert(questionData).returning('*')
    })
}
