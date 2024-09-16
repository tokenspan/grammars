import './component'
import { Website } from '@lib/websites'

export function findEditableElements() {
  // Slack
  const website = new Website('app.slack.com')
  const editableElements: HTMLElement[] = website.findEditableElements()

  for (const element of editableElements) {
    injectGrammarsButton(element)
  }

  console.log('editableElements', editableElements)
  return editableElements.length > 0
}

export function loadEditableContent() {
  const id = setInterval(() => {
    if (findEditableElements()) {
      clearInterval(id)
      console.log('loadEditableContent')
    }
  }, 1000)
}

export function injectGrammarsButton(targetElement: HTMLElement) {
  console.log('injected grammars button')
  const grammarsExtension = document.createElement('grammars-extension')
  grammarsExtension.style.height = '24px'
  grammarsExtension.style.width = '24px'
  // Slack
  grammarsExtension.style.marginRight = '4px'
  grammarsExtension.style.marginTop = '8px'
  targetElement.appendChild(grammarsExtension)
}

export async function applyCorrection() {}

export async function mount() {
  loadEditableContent()
  console.log('mount')
}

void mount()
