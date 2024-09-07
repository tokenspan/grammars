import type { LLM } from '@extension/llm'

export const correctText = async (llm: LLM, text: string) => {
  const chatCompletion = await llm.complete({
    messages: [
      {
        role: 'system',
        content:
          "Act as a proofreader and review the following text. Feel free to rephrase sentences or make changes to enhance clarity but maintain the overall tone and style of the original. Don't provide any explanation, or other information, just return the corrected text",
      },
      {
        role: 'user',
        content: text,
      },
    ],
    temperature: 0.3,
  })

  const content = chatCompletion.firstChoiceMessage?.content?.trim().replaceAll('\n', ' ')
  return content ?? null
}
