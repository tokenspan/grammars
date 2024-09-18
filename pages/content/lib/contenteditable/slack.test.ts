import { describe, it } from 'vitest'
import { findDifferences } from '@extension/core'
import { HTMLToJSON, JSONToHTML } from 'html-to-json-parser'
import { JSDOM } from 'jsdom'
import { applyPatch } from '@lib/utils'

describe('SlackPage', () => {
  it('should return editable elements', async () => {
    const html = `<root>She <strong>don't</strong> like cat</root>`
    const text1 = `She don't like cat`
    const text2 = `She doesn't like cat`
    const diff = findDifferences(text1, text2)
    const htmlJson = await HTMLToJSON(html)
    const htmlText = await JSONToHTML(htmlJson)
    console.log('htmlJson', htmlJson)
    console.log('htmlText', htmlText)
    console.log('diff', diff)
  })

  it('should apply patch', async () => {
    // Example usage
    const htmlInput = "She <strong>don't</strong> like cat"
    const patch = [{ text: 'She ' }, { remove: "don't", add: "doesn't" }, { text: ' like cat' }]

    const result = applyPatch(htmlInput, patch)
    console.log('result', result)
  })
})
