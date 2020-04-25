exports.up = function (knex) {
  return knex.schema.createTable('questions', (questionsTable) => {
    questionsTable.increments('question_id').primary().unique().notNullable()
    questionsTable
      .string('category')
      .references('categories.category_name')
      .onDelete('CASCADE')
    questionsTable.text('question_text').unique().notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('questions')
}
