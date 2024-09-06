import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: '',
})

export const correctText = async (text: string) => {
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          "Grammar check and don't provide any explanation, or other information, just return the corrected text",
      },
      {
        role: 'user',
        content: text,
      },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.3,
  })

  return chatCompletion.choices[0]?.message?.content?.trim().replaceAll('\n', ' ')
}
