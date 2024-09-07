import { describe, it, expect } from 'vitest'
import { findDifferences } from './compareText'

describe('findDifferences', () => {
  it('should return false if the text is different', () => {
    const text1 = 'hello world'
    const text2 = 'hello world!'

    const actual = findDifferences(text1, text2)
    const expected = [
      {
        index: 1,
        actual: 'world',
        expected: 'world!',
      },
    ]

    expect(actual).toEqual(expected)
  })
})
