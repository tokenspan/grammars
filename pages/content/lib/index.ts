import './component'
import { ContentEditable } from '@lib/contenteditable'
import { LLM } from '@extension/llm'

const llm = new LLM({
  apiKey: '',
  model: 'gpt-3.5-turbo',
})

export function findEditableElements() {
  // Slack
  const website = new ContentEditable('mail.google.com', llm)
  return website.injectGrammarsButton()
}

export function loadEditableContent() {
  const id = setInterval(() => {
    if (findEditableElements()) {
      clearInterval(id)
      console.log('loadEditableContent')
    }
  }, 1000)
}

export async function mount() {
  loadEditableContent()
  console.log('mount')
}

void mount()
