const {
  fetchCategories,
  addCategory,
  removeCategory,
} = require('../models/categories-models')

exports.sendCategories = (req, res, next) => {
  fetchCategories().then((categories) => {
    res.status(200).send(categories)
  })
}

exports.postCategory = (req, res, next) => {
  const categoryToAdd = req.body
  addCategory(categoryToAdd)
    .then((category) => {
      res.status(201).send(category)
    })
    .catch(next)
}

exports.deleteCategory = (req, res, next) => {
  const { category } = req.query
  removeCategory(category)
    .then(() => {
      res.sendStatus(204)
    })
    .catch(next)
}
