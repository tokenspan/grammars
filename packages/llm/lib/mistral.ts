import 'dotenv/config'
import { Mistral } from '@mistralai/mistralai'

const client = new Mistral({
  apiKey: '',
})

async function main() {
  const chatCompletion = await client.chat.complete({
    messages: [
      {
        role: 'system',
        content:
          "Grammar check and don't provide any explanation, or other information, just return the corrected text",
      },
      {
        role: 'user',
        content: "Adam told me we wasn't have any food so I said that I is some on the way home.",
      },
    ],
    model: 'open-mistral-nemo-2407',
    temperature: 0.3,
    // tools: [
    //   {
    //     type: "function",
    //     function: {
    //       name: "grammar_correction",
    //       description: "Check and correct all grammar errors in the text",
    //       parameters: {
    //         type: "object",
    //         properties: {
    //           corrected_text: {
    //             type: "string",
    //             description: "The fixed text with grammar errors corrected",
    //           },
    //         },
    //         required: ["corrected_text"],
    //       },
    //     },
    //   },
    // ],
  })

  console.log(JSON.stringify(chatCompletion, null, 2))
}

main().catch(console.error)
