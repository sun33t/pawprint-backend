const methodNotAllowed = (req, res, next) => {
  res.status(405).send({ msg: 'Method not allowed' })
}

module.exports = { methodNotAllowed }
