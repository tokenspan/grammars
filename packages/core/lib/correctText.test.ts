import { correctText } from './correctText'
import { LLM } from '@extension/llm'
import { describe, it } from 'vitest'

describe('correctText', () => {
  it('should return corrected text', async () => {
    const text = "Adam told me we wasn't have any food so I said that I is some on the way home."
    const llm = new LLM({
      provider: 'openai',
      apiKey: process.env.OPENAI_API_KEY!,
      model: 'gpt-3.5-turbo',
    })
    const correctedText = await correctText(llm, text)

    console.log(correctedText)
  })
})
