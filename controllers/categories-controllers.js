const { fetchCategories, addCategory } = require('../models/categories-models')

exports.sendCategories = (req, res, next) => {
  fetchCategories().then((categories) => {
    res.status(200).send(categories)
  })
}

exports.postCategory = (req, res, next) => {
  const categoryToAdd = req.body
  addCategory(categoryToAdd).then((category) => {
    res.status(201).send(category)
  })
}
