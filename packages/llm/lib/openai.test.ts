import OpenAI from 'openai'

describe('OpenAIBeamLLM', () => {
  it('should complete', async () => {
    const client = new OpenAI({
      apiKey: '',
    })
    console.log(client instanceof OpenAI)
  })
})
