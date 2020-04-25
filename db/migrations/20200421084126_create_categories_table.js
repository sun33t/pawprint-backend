exports.up = function (knex) {
  return knex.schema.createTable('categories', (categoriesTable) => {
    categoriesTable.string('category_name').primary().unique().notNullable()
    categoriesTable.string('category_title').notNullable().unique()
    categoriesTable.integer('position').notNullable().unique()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('categories')
}
