const { fetchEndpoints } = require('../models/api-models')

const sendEndpoints = (req, res, next) => {
  res.status(200).send({ msg: 'endpoints json would be served here' })
}

module.exports = { sendEndpoints }
