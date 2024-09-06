export interface Difference {
  index: number
  actual: string | null
  expected: string | null
}

export function findDifferences(sentence1: string, sentence2: string): Difference[] {
  const words1 = sentence1.split(' ')
  const words2 = sentence2.split(' ')

  const diff: Difference[] = []

  let i = 0
  let j = 0
  while (i < words1.length || j < words2.length) {
    if (i < words1.length && j < words2.length) {
      if (words1[i] !== words2[j]) {
        diff.push({
          index: i,
          actual: words1[i],
          expected: words2[j],
        })
      }
      i++
      j++
    } else if (i < words1.length) {
      diff.push({
        index: i,
        actual: words1[i],
        expected: null,
      })
      i++
    } else if (j < words2.length) {
      diff.push({
        index: j,
        actual: null,
        expected: words2[j],
      })
      j++
    }
  }

  return diff
}
