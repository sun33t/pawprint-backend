exports.methodNotAllowed = (req, res, next) => {
  res.status(405).send({ msg: 'Method not allowed' })
}

exports.routeNotFound = (req, res, next) => {
  res.status(404).send({ msg: 'Route not found' })
}

exports.psqlErrorHandler = (err, req, res, next) => {
  const psqlErrors = { '42703': 400, '23505': 400, '23502': 400 }

  psqlErrors[err.code]
    ? res
        .status(psqlErrors[err.code])
        .send({ msg: err.message.split(' - ')[1] || 'bad request' })
    : next(err)
}
exports.serverErrorHandler = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' })
}
