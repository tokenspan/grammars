import ollama from 'ollama'

async function main() {
  const chatCompletion = await ollama.chat({
    model: 'gemma2:2b',
    options: {
      temperature: 0.3,
    },
    keep_alive: '1h',
    messages: [
      {
        role: 'system',
        content:
          "Grammar check and don't provide any explanation, or other information, or any special characters. You only need to return the corrected text",
      },
      {
        role: 'user',
        content: "Adam told me we didn't have any food so I said that I is some on the way home",
      },
    ],
  })

  console.log(JSON.stringify(chatCompletion, null, 2))
}

main().catch(console.error)
