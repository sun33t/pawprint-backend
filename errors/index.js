const methodNotAllowed = (req, res, next) => {
  res.status(405).send({ msg: 'Method not allowed' })
}

const routeNotFound = (req, res, next) => {
  res.status(404).send({ msg: 'Route not found' })
}

module.exports = { methodNotAllowed, routeNotFound }
