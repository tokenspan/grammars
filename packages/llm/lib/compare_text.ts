function findDifferences(sentence1: string, sentence2: string): string {
  const words1 = sentence1.split(' ')
  const words2 = sentence2.split(' ')

  let diff: string[] = []

  let i = 0
  let j = 0
  while (i < words1.length || j < words2.length) {
    if (i < words1.length && j < words2.length) {
      if (words1[i] !== words2[j]) {
        diff.push(`Sentence 1: ${words1[i]} | Sentence 2: ${words2[j]} | Start: ${i}`)
      }
      i++
      j++
    } else if (i < words1.length) {
      diff.push(`Sentence 1: ${words1[i]} | Sentence 2: (None), Start: ${i}`)
      i++
    } else if (j < words2.length) {
      diff.push(`Sentence 1: (None) | Sentence 2: ${words2[j]}, Start: ${i}`)
      j++
    }
  }

  return diff.join('\n')
}

const diffs = findDifferences(
  "Adam told me we didn't have any food, so I said that I have some on the way home.",
  "Adam told me we wasn't have any food so I said that I are some on the way home.",
)
console.log(diffs)
