import { describe, it, expect } from 'vitest'
import type { Difference } from './compareText'
import { applyDifference, findDifferences } from './compareText'

describe('findDifferences', () => {
  it('should return expected differences', () => {
    const text1 = 'hello world'
    const text2 = 'hello world!'

    const actual = findDifferences(text1, text2)
    const expected = [
      {
        index: 11,
        removed: null,
        added: '!',
      },
    ]

    expect(actual).toEqual(expected)
  })

  it('should return empty array if the text is the same', () => {
    const text1 = 'hello world'
    const text2 = 'hello world'

    const actual = findDifferences(text1, text2)
    const expected: Difference[] = []

    expect(actual).toEqual(expected)
  })

  it('should return complex differences', () => {
    const text1 = "Adam told me we wasn't have any food so I said that I is some on the way home."
    const text2 = "Adam told me we didn't have any food, so I said that I would get some on the way home."

    const actual = findDifferences(text1, text2)

    expect(actual).toEqual([
      {
        removed: false,
        added: false,
        replaced: false,
        value: 'Adam told me we ',
        corrected: null,
      },
      {
        removed: false,
        added: false,
        replaced: true,
        value: 'wasn',
        corrected: 'didn',
      },
      {
        removed: false,
        added: false,
        replaced: false,
        value: "'t have any food",
        corrected: null,
      },
      {
        removed: true,
        added: false,
        replaced: false,
        value: ', ',
        corrected: ', ',
      },
      {
        removed: false,
        added: false,
        replaced: false,
        value: 'so I said that I ',
        corrected: null,
      },
      {
        removed: false,
        added: false,
        replaced: true,
        value: 'is',
        corrected: 'would get',
      },
      {
        removed: false,
        added: false,
        replaced: false,
        value: ' some on the way home.',
        corrected: null,
      },
    ])
  })
})

describe('applyDifference', () => {
  it('should apply differences to the original text', () => {
    let text1 = "Adam     told me we wasn't have any food   so I said that I is some on the way home."
    const text2 = "Adam told me we didn't have any food, so I said that I would get some on the way home."

    let differences: Difference[] = findDifferences(text1, text2)
    text1 = applyDifference(differences, 0)
    console.log('differences', differences)
    console.log('text1', text1)
    expect(text1).toEqual("Adam told me we wasn't have any food   so I said that I is some on the way home.")

    differences = findDifferences(text1, text2)
    text1 = applyDifference(differences, 0)
    expect(text1).toEqual("Adam told me we didn't have any food   so I said that I is some on the way home.")

    differences = findDifferences(text1, text2)
    text1 = applyDifference(differences, 0)
    expect(text1).toEqual("Adam told me we didn't have any food, so I said that I is some on the way home.")

    differences = findDifferences(text1, text2)
    text1 = applyDifference(differences, 0)
    expect(text1).toEqual("Adam told me we didn't have any food, so I said that I would some on the way home.")

    differences = findDifferences(text1, text2)
    text1 = applyDifference(differences, 0)
    expect(text1).toEqual("Adam told me we didn't have any food, so I said that I would get some on the way home.")
  })

  it('should apply differences to the original text 1', () => {
    let text1 = "Adam    told mewe wasn't have any food so I said that I is some on the way home."
    const text2 = "Adam told me we didn't have any food, so I said that I would get some on the way home."

    let differences: Difference[] = findDifferences(text1, text2)
    console.log('differences', differences)
    text1 = applyDifference(differences, 0)

    differences = findDifferences(text1, text2)
    text1 = applyDifference(differences, 0)
    expect(text1).toEqual("Adam told me we didn't have any food, so I said that I is some on the way home.")

    differences = findDifferences(text1, text2)
    text1 = applyDifference(differences, 0)
    expect(text1).toEqual("Adam told me we didn't have any food, so I said that I would get some on the way home.")
  })
})
