import 'dotenv/config'
import OpenAI from 'openai'

const client = new OpenAI({
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
    model: 'gpt-3.5-turbo',
    temperature: 0.3,
    // tools: [
    //   {
    //     type: "function",
    //     function: {
    //       name: "grammar_check",
    //       description: "Grammar check and provide a corrected version",
    //       parameters: {
    //         type: "object",
    //         properties: {
    //           corrected_text: {
    //             type: "string",
    //             description:
    //               "The corrected text after fixing spelling and grammar errors",
    //           },
    //           explanation: {
    //             type: "string",
    //             description:
    //               "Explain the reason for the correction made to the text in details",
    //           },
    //         },
    //         required: ["corrected_text", "explanation"],
    //       },
    //     },
    //   },
    // ],
  })

  console.log(JSON.stringify(chatCompletion, null, 2))
}

main().catch(console.error)
