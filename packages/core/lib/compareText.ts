import { Diff } from 'diff'

interface TextDiff {
  text: string
}

interface ChangeDiff {
  add: string
  remove: string
}

export type Difference = TextDiff | ChangeDiff

const isTextDiff = (diff: Difference): diff is TextDiff => !('add' in diff) && !('remove' in diff)

const isChangeDiff = (diff: Difference): diff is ChangeDiff => !('text' in diff)

interface DiffWordsOptions {
  ignoreWhitespace?: boolean
  ignoreCase?: boolean
  intlSegmenter?: Intl.Segmenter
}

const wordWithSpaceDiff = new Diff()
wordWithSpaceDiff.tokenize = function (value) {
  return Array.from(new Intl.Segmenter('en', { granularity: 'word' }).segment(value), segment => segment.segment)
}

export function findDifferences(sentence1: string, sentence2: string): Difference[] {
  const diffs = wordWithSpaceDiff.diff(sentence1, sentence2, {
    ignoreWhitespace: false,
    ignoreCase: false,
    intlSegmenter: new Intl.Segmenter('en', { granularity: 'word' }),
  } as DiffWordsOptions)

  const differences: Difference[] = []
  let previousChange: Difference | null = null
  for (let i = 0; i < diffs.length; i++) {
    const diff = diffs[i]
    if (!diff.added && !diff.removed) {
      differences.push({
        text: diff.value,
      })
      previousChange = null
      continue
    }

    if (!previousChange) {
      previousChange = {
        remove: '',
        add: '',
      }
      differences.push(previousChange)
    }

    if (!previousChange) {
      continue
    }

    if (diff.removed) {
      previousChange.remove += diff.value
    }

    if (diff.added) {
      previousChange.add += diff.value
    }
  }

  return differences
}

export function applyDifference(differences: Difference[], index: number): string {
  let counter = -1
  let isUpdated = false
  let result = ''
  for (const difference of differences) {
    if (isTextDiff(difference)) {
      result += difference.text
    }

    if (isChangeDiff(difference)) {
      counter += 1
      if (counter === index && !isUpdated) {
        result += difference.add
        isUpdated = true
      } else {
        result += difference.remove
      }
    }
  }

  return result
}
