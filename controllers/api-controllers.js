const endpoints = require('../endpoints.json')

const sendEndpoints = (req, res, next) => {
  res.status(200).send({ endpoints })
}

module.exports = { sendEndpoints }
