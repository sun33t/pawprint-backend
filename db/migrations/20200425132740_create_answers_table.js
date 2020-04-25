exports.up = function (knex) {
  return knex.schema.createTable('answers', (answersTable) => {
    answersTable.increments('answer_id').primary().unique().notNullable()
    answersTable
      .integer('question_id')
      .references('questions.question_id')
      .notNullable()
      .onDelete('CASCADE')
    answersTable.integer('position').notNullable()
    answersTable.string('answer_text').notNullable()
    answersTable.float('score').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('answers')
}
