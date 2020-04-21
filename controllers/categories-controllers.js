const { fetchCategories } = require('../models/categories-models')

exports.sendCategories = (req, res, next) => {
  fetchCategories().then((categories) => {
    res.status(200).send(categories)
  })
}
