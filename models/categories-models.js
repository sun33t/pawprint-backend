const connection = require('../db/connection')

exports.fetchCategories = () => {
  return connection('categories')
    .select('*')
    .from('categories')
    .then((categories) => {
      return { categories }
    })
}
