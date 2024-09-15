import './component'

export function findEditableElements() {
  // Slack
  const allElements = document.getElementsByClassName('ql-container')
  const editableElements: HTMLElement[] = []

  for (let i = 0; i < allElements.length; i++) {
    const element = allElements[i] as HTMLElement
    editableElements.push(element)
    injectGrammarsButton(element)
  }

  // for (const element in allElements) {
  //   const el = allElements[element] as HTMLElement
  //   editableElements.push(el)
  // }

  // const textareas = document.querySelectorAll('textarea')
  // textareas.forEach(textarea => {
  //   editableElements.push(textarea)
  //   injectGrammarsButton(textarea)
  // })

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
