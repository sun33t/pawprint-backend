const categoriesRouter = require('express').Router()
const { methodNotAllowed } = require('../errors/index')
const { sendCategories } = require('../controllers/categories-controllers')

categoriesRouter.route('/').get(sendCategories).all(methodNotAllowed)

module.exports = { categoriesRouter }
