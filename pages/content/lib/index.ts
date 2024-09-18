import './component'
import { ContentEditable } from '@lib/contenteditable'

export function findEditableElements() {
  // Slack
  const website = new ContentEditable('app.slack.com')
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

export async function applyCorrection() {}

export async function mount() {
  loadEditableContent()
  console.log('mount')
}

void mount()
