import 'dotenv/config'
import Groq from 'groq-sdk'

const client = new Groq({
  apiKey: '',
})

async function main() {
  const chatCompletion = await client.chat.completions.create({
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
    model: 'llama-3.1-70b-versatile',
    temperature: 0.3,
    // tools: [
    //   {
    //     type: "function",
    //     function: {
    //       name: "grammar_correction",
    //       description:
    //         "Correct grammar errors in text and explain the correction",
    //       parameters: {
    //         type: "object",
    //         properties: {
    //           corrected_text: {
    //             type: "string",
    //             description: "The corrected version grammar errors fixed",
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
