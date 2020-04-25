const { expect } = require('chai')
const { formatQuestions, formatAnswers, makeRefObj } = require('../utils/utils')
const { questionData } = require('../db/data/test-data/index')

describe('formatQuestions', () => {
  it('takes an empty array and returns an empty array ', () => {
    expect(formatQuestions([])).to.eql([])
  })
  it('returns a new array', () => {
    const input = []
    expect(formatQuestions(input)).to.not.equal(input)
  })
  it('takes an array of one raw question and returns an array containing the correctly formatted question', () => {
    const question = [
      {
        category: 'diet',
        question_text: 'How often do you eat meat and dairy?',
        option_1: {
          text: 'Daily',
          score: 0.6,
        },
        option_2: {
          text: '1 or 2 times',
          score: 0.3,
        },
        option_3: {
          text: '3+ times per week',
          score: 0.1,
        },
        option_4: {
          text: 'Not at all',
          score: 0,
        },
      },
    ]

    const actual = formatQuestions(question)
    const expected = [
      {
        category: 'diet',
        question_text: 'How often do you eat meat and dairy?',
      },
    ]
    expect(actual).to.eql(expected)
  })
  it('takes am array of multiple raw questions and returns an array of correctly formatted questions', () => {
    const actual = formatQuestions(questionData)

    actual.map((question, index) => {
      expect(question).to.contain.keys(['category', 'question_text'])

      if (index === 2) {
        expect(question.category).to.equal('diet')
        expect(question.question_text).to.equal(
          'How much food ends up wasted in your household?'
        )
      }
    })
  })
})

describe('formatAnswers', () => {
  it('returns an empty array when passed an empty array', () => {
    expect(formatAnswers([])).to.eql([])
  })
  it('returns a new array', () => {
    const input = []
    expect(formatAnswers(input)).to.not.equal(input)
  })
})

describe.only('makeRefObj', () => {
  it('returns an empty object when passed an empty array', () => {
    expect(makeRefObj([])).to.eql({})
  })
  it('takes an array of one object and returns a correctly formatted object', () => {
    const input = [
      {
        question_id: 1,
        question_text: 'How often do you eat meat and dairy?',
        category: 'diet',
      },
    ]

    const expected = { 'How often do you eat meat and dairy?': 1 }
    expect(makeRefObj(input, 'question_text', 'question_id')).to.eql(expected)
  })
  it('takes an array of multiple question objects and returns an object of correctly formatted key value pairs', () => {
    const input = [
      {
        question_id: 1,
        question_text: 'How often do you eat meat and dairy?',
        category: 'diet',
      },
      {
        question_id: 2,
        category: 'diet',
        question_text: 'How big are your portion sizes?',
      },
      {
        category: 'diet',
        question_text: 'How much food ends up wasted in your household?',
        question_id: 3,
      },
      {
        category: 'diet',
        question_text:
          'How often do you eat avocados, asparagus, kiwi fruit or pineapples?',
        question_id: 4,
      },
      {
        category: 'diet',
        question_text: 'How often do you eat seasonal veg from Europe?',
        question_id: 5,
      },
    ]
    const expected = {
      'How often do you eat meat and dairy?': 1,
      'How big are your portion sizes?': 2,
      'How much food ends up wasted in your household?': 3,
      'How often do you eat avocados, asparagus, kiwi fruit or pineapples?': 4,
      'How often do you eat seasonal veg from Europe?': 5,
    }
    expect(makeRefObj(input, 'question_text', 'question_id')).to.eql(expected)
  })
})
