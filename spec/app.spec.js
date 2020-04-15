process.env.NODE_ENV = 'test'
const app = require('../app')
const request = require('supertest')
const { expect } = require('chai')
const connection = require('../db/connection')

/* TESTS FOR /API ENDPOINT - Placeholder route */
describe('/api', () => {
  beforeEach(() => connection.seed.run())
  after(() => connection.destroy())

  it('GET responds with a placeholder message', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then((response) => {
        expect(response.body).to.eql({
          msg: 'endpoints json would be served here',
        })
      })
  })
})
