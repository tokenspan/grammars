import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: '',
})

async function main() {
  const chatCompletion = await client.messages.create({
    messages: [
      {
        role: 'user',
        content: "Adam told me we wasn't have any food so I said that I is some on the way home.",
      },
      {
        role: 'assistant',
        content:
          "Grammar check and don't provide any explanation, or other information, just return the corrected text",
      },
    ],
    model: 'claude-3-haiku-20240307',
    temperature: 0.3,
    max_tokens: 1000,
    tools: [
      // {
      //   name: "grammar_correction",
      //   description: "Correct spelling and grammar errors in text",
      //   input_schema: {
      //     type: "object",
      //     properties: {
      //       corrected_text: {
      //         type: "string",
      //         description:
      //           "The corrected text with spelling and grammar errors fixed",
      //       },
      //       explanation: {
      //         type: "string",
      //         description: "An explanation of the correction made to the text",
      //       },
      //     },
      //     required: ["corrected_text", "explanation"],
      //   },
      // },
    ],
  })

  console.log(JSON.stringify(chatCompletion, null, 2))
}

main().catch(console.error)
