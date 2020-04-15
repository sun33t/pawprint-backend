const ENV = process.env.NODE_ENV || 'development'

const testData = require('./test-data/questions')
const devData = require('./development-data/questions')

const data = {
  test: testData,
  development: devData,
  production: devData,
}

module.exports = data[ENV]
