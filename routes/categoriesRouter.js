const categoriesRouter = require('express').Router()
const { methodNotAllowed } = require('../errors/index')
const {
  sendCategories,
  postCategory,
  deleteCategory,
} = require('../controllers/categories-controllers')

categoriesRouter
  .route('/')
  .get(sendCategories)
  .post(postCategory)
  .delete(deleteCategory)
  .all(methodNotAllowed)

module.exports = { categoriesRouter }
