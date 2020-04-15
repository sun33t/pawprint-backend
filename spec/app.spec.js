process.env.NODE_ENV = 'test'
const app = require('../app')
const request = require('supertest')
const { expect } = require('chai')
const connection = require('../db/connection')

/* TESTS FOR /API ENDPOINT - Placeholder route for serving endpoints json */
describe('/api', () => {
  beforeEach(() => connection.seed.run())
  after(() => connection.destroy())

  it('GET responds with a placeholder message', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        expect(body.msg).to.equal('endpoints json would be served here')
      })
  })

  it('INVALID METHOD requests respond with a status 405', () => {
    const invalidMethods = ['patch', 'put', 'delete']
    const methodPromises = invalidMethods.map((method) => {
      return request(app)
        [method]('/api')
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal('Method not allowed')
        })
    })
    return Promise.all(methodPromises)
  })

  /* TESTS FOR /API/QUESTIONS ENDPOINT */

  describe('/api/questions', () => {
    it('GET responds with an array of question objects', () => {
      return request(app)
        .get('/api/questions')
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object')
          expect(body.questions[0]).to.contain.keys([
            'question_id',
            'category',
            'question_text',
            'option_1',
            'option_2',
            'option_3',
            'option_4',
          ])
        })
    })
  })
})
