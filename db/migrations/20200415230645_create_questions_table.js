exports.up = function (knex) {
  return knex.schema.createTable('questions', (questionsTable) => {
    questionsTable.increments('question_id').primary().notNullable()
    questionsTable.string('category').notNullable()
    questionsTable.text('question_text').unique().notNullable()
    questionsTable.string('option_1').notNullable()
    questionsTable.string('option_2').notNullable()
    questionsTable.string('option_3').notNullable()
    questionsTable.string('option_4').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('questions')
}
