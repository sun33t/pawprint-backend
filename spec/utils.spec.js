const { expect } = require('chai')
const { formatQuestions } = require('../utils/utils')
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
})
