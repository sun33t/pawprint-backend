process.env.NODE_ENV = 'test'
const app = require('../app')
const request = require('supertest')
const { expect } = require('chai')
const connection = require('../db/connection')

/* TESTS FOR /API ENDPOINT */
describe('/api', () => {
  beforeEach(() => connection.seed.run())
  after(() => connection.destroy())

  it('GET responds with a json object indicating the available endpoints on this API', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        expect(body).to.be.an('object')
        expect(body).to.contain.keys('endpoints')
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
    it('GET responds with an object containing correctly formatted questions data', () => {
      return request(app)
        .get('/api/questions')
        .expect(200)
        .then(({ body }) => {
          expect(body.questions).to.be.an('object')
          expect(body.questions).to.contain.keys([
            'totalQuestions',
            'questionsInCategory',
            'questions',
          ])
        })
    })
    it('GET responds with an object containing a questions key holding a correctly formatted array of questions', () => {
      return request(app)
        .get('/api/questions')
        .expect(200)
        .then(({ body }) => {
          const {
            questions: { totalQuestions, questionsInCategory, questions },
          } = body
          expect(questions.length).to.equal(20)
          questions.map((question) => {
            expect(question).to.contain.keys([
              'question_id',
              'category',
              'question_text',
              'answers',
            ])
            question.answers.map((answer) => {
              expect(answer).to.contain.keys([
                'answer_id',
                'question_id',
                'position',
                'answer_text',
                'score',
              ])
            })
          })
        })
    })
    it('GET responds with an array of question objects filtered by the provided category', () => {
      return request(app)
        .get('/api/questions?category=diet')
        .expect(200)
        .then(({ body }) => {
          const {
            questions: { totalQuestions, questionsInCategory, questions },
          } = body
          expect(questions.length).to.equal(5)
          questions.map((question) => {
            expect(question).to.contain.keys([
              'question_id',
              'category',
              'question_text',
              'answers',
            ])
            expect(question.category).to.equal('diet')
            question.answers.map((answer) => {
              expect(answer).to.contain.keys([
                'answer_id',
                'question_id',
                'position',
                'answer_text',
                'score',
              ])
            })
          })
        })
    })
    it('POST responds with a status 201 and the newly posted question', () => {
      return request(app)
        .post('/api/questions')
        .send({
          category: 'other',
          question_text: 'Other Question 6?',
          option_1: {
            text: 'Option 1',
            score: 0,
          },
          option_2: {
            text: 'Option 2',
            score: 0.1,
          },
          option_3: {
            text: 'Option 3',
            score: 0.3,
          },
          option_4: {
            text: 'Option 4',
            score: 0.6,
          },
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.question.category).to.equal('other')
          expect(body.question.question_text).to.equal('Other Question 6?')
          body.question.answers.map((answer) => {
            expect(answer).to.contain.keys([
              'answer_id',
              'question_id',
              'position',
              'answer_text',
              'score',
            ])
            expect(answer.question_id).to.equal(body.question.question_id)
          })
        })
    })
    it("POST responds with a status 400 when attempting to add a category that doesn't exist", () => {
      return request(app)
        .post('/api/questions')
        .send({
          category: 'hobbies',
          question_text: 'Hobbies Question 6?',
          option_1: {
            text: 'Option 1',
            score: 0,
          },
          option_2: {
            text: 'Option 2',
            score: 0.1,
          },
          option_3: {
            text: 'Option 3',
            score: 0.3,
          },
          option_4: {
            text: 'Option 4',
            score: 0.6,
          },
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal(
            'insert or update on table "questions" violates foreign key constraint "questions_category_foreign"'
          )
        })
    })
    it('POST responds with a status 400 when attempting to add an invalid question', () => {
      return request(app)
        .post('/api/questions')
        .send({
          categor: 'other',
          question_text: 'Other Question 7?',
          option_1: {
            text: 'Option 1',
            score: 0,
          },
          option_2: {
            text: 'Option 2',
            score: 0.1,
          },
          option_3: {
            text: 'Option 3',
            score: 0.3,
          },
          option_4: {
            text: 'Option 4',
            score: 0.6,
          },
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
          question_text: 'How big are your portion sizes?',
          option_1: {
            text: 'Smaller than average',
            score: 0.1,
          },
          option_2: {
            text: 'Average',
            score: 0.3,
          },
          option_3: {
            text: 'Larger than average',
            score: 0.6,
          },
          option_4: {
            text: "I'm not sure",
            score: 0,
          },
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal(
            'duplicate key value violates unique constraint "questions_question_text_unique"'
          )
        })
    })
    it('POST responds with a status 400 when attempting to add an empty question', () => {
      return request(app)
        .post('/api/questions')
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal(
            'null value in column "category" violates not-null constraint'
          )
        })
    })
    it('DELETE responds with a status 204 when deleting an existing question', () => {
      return request(app).delete('/api/questions?question_id=1').expect(204)
    })

    it("DELETE responds with a status 404 when deleting a question that doesn't exist", () => {
      return request(app)
        .delete('/api/questions?question_id=99999')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal(
            'question with question_id: 99999 does not exist'
          )
        })
    })
    it('INVALID METHOD requests respond with a status 405', () => {
      const invalidMethods = ['patch', 'put']
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
  })

  /* TESTS FOR /API/CATEGORIES ENDPOINT */

  describe('/categories', () => {
    it('INVALID METHOD requests respond with a status 405', () => {
      const invalidMethods = ['patch', 'put']
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]('/api/categories')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method not allowed')
          })
      })
      return Promise.all(methodPromises)
    })

    it('GET responds with status 200 and an array of category objects', () => {
      return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object')
          expect(body.categories[0]).to.contain.keys([
            'category_name',
            'category_title',
            'question_count',
          ])
        })
    })

    it('POST responds with status 201 and the newly posted category', () => {
      return request(app)
        .post('/api/categories')
        .send({
          category_name: 'hobbies',
          category_title: 'Hobbies',
          position: 5,
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.category.category_name).to.equal('hobbies')
          expect(body.category.category_title).to.equal('Hobbies')
        })
    })

    it('POST responds with a status 400 when attempting to add an invalid category', () => {
      return request(app)
        .post('/api/categories')
        .send({
          name: 'hobbies',
          category_title: 'Hobbies',
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal(
            'column "name" of relation "categories" does not exist'
          )
        })
    })

    it('POST responds with a status 400 when attempting to add an existing category', () => {
      return request(app)
        .post('/api/categories')
        .send({
          category_name: 'diet',
          category_title: 'Diet',
          position: 1,
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal(
            'duplicate key value violates unique constraint "categories_pkey"'
          )
        })
    })

    it('POST responds with a status 400 when attempting to add an empty category', () => {
      return request(app)
        .post('/api/categories')
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal(
            'null value in column "category_name" violates not-null constraint'
          )
        })
    })

    it('DELETE responds with a status 204 when deleting an existing category', () => {
      return request(app).delete('/api/categories?category=diet').expect(204)
    })
    it("DELETE responds with a status 404 when deleting a category that doesn't exist", () => {
      return request(app)
        .delete('/api/categories?category=hobbies')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal(
            'category with category_name: hobbies not found'
          )
        })
    })
  })
})
