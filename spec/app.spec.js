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

  it('responds with a status 404 when provided with a bad /api* url', () => {
    return request(app)
      .get('/api/not-a-route')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.equal('Route not found')
      })
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

    it('GET responds with an array of question objects filtered by the provided category', () => {
      return request(app)
        .get('/api/questions?category=travel')
        .expect(200)
        .then(({ body }) => {
          body.questions.map((question) => {
            expect(question.category).to.equal('travel')
          })
        })
    })

    it('POST responds with a status 201 and the newly posted question', () => {
      return request(app)
        .post('/api/questions')
        .send({
          category: 'health',
          question_text: 'How often do you exercise?',
          option_1: 'Daily',
          option_2: '1 or 2 times',
          option_3: '3+ times per week',
          option_4: 'Not at all',
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.question.category).to.equal('health')
        })
    })
    it('POST responds with a status 400 when attempting to add an invalid question', () => {
      return request(app)
        .post('/api/questions')
        .send({
          categor: 'health',
          question_text: 'How often do you exercise?',
          option_1: 'Daily',
          option_2: '1 or 2 times',
          option_3: '3+ times per week',
          option_4: 'Not at all',
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal(
            'column "categor" of relation "questions" does not exist'
          )
        })
    })

    it('POST responds with a status 400 when attempting to add an existing question', () => {
      return request(app)
        .post('/api/questions')
        .send({
          category: 'diet',
          question_text: 'How often do you eat meat and dairy?',
          option_1: 'Daily',
          option_2: '1 or 2 times',
          option_3: '3+ times per week',
          option_4: 'Not at all',
        })
        .expect(400)
        .then(({ body }) => {
          console.log(body.msg)
          expect(body.msg).to.equal(
            'duplicate key value violates unique constraint "questions_question_text_unique"'
          )
        })
    })

    it('INVALID METHOD requests respond with a status 405', () => {
      const invalidMethods = ['patch', 'put', 'delete']
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]('/api/questions')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method not allowed')
          })
      })
      return Promise.all(methodPromises)
    })

    it('POST responds with a status 400 when attempting to add an empty question', () => {
      return request(app)
        .post('/api/questions')
        .send({})
        .expect(400)
        .then(({ body }) => {
          console.log(body.msg)
          expect(body.msg).to.equal(
            'null value in column "category" violates not-null constraint'
          )
        })
    })
  })
})
