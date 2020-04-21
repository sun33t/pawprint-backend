const categoriesRouter = require('express').Router()
const { methodNotAllowed } = require('../errors/index')
const {
  sendCategories,
  postCategory,
} = require('../controllers/categories-controllers')

categoriesRouter
  .route('/')
  .get(sendCategories)
  .post(postCategory)
  .all(methodNotAllowed)

module.exports = { categoriesRouter }
