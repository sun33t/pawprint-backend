const connection = require('../db/connection')

exports.fetchCategories = () => {
  return connection('categories')
    .select('categories.*')
    .count({ question_count: 'questions.category' })
    .from('categories')
    .leftJoin('questions', 'questions.category', 'categories.category_name')
    .groupBy('categories.category_name')
    .orderBy('categories.category_name')
    .then((categories) => {
      return { categories }
    })
}

exports.addCategory = (newCategory) => {
  return connection('categories')
    .insert(newCategory)
    .returning('*')
    .then((response) => {
      const [category] = response
      return { category }
    })
}

exports.removeCategory = (category) => {
  return connection('categories')
    .where('category_name', category)
    .del()
    .then((response) => {
      return response === 0
        ? Promise.reject({
            status: 404,
            msg: `category with category_name: ${category} not found`,
          })
        : true
    })
}
