const connection = require('../db/connection')

exports.fetchCategories = () => {
  return connection('categories')
    .select('*')
    .from('categories')
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
