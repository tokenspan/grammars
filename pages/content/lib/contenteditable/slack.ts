import { BaseContentEditable } from '@lib/contenteditable/types'

export class SlackPage extends BaseContentEditable {
  findElements(): HTMLElement[] {
    const allElements = document.getElementsByClassName('ql-container')
    const editableElements: HTMLElement[] = []

    for (const element of allElements) {
      editableElements.push(element as HTMLElement)
    }

    return editableElements
  }

  getInnerElement(): HTMLElement | null {
    return document.querySelector('.ql-editor > p')
  }

  getInnerHTML(): string | null {
    return this.getInnerElement()?.innerHTML ?? null
  }

  getInnerText(): string | null {
    return this.getInnerElement()?.innerText ?? null
  }

  getComposerElements(): HTMLElement[] {
    return this.findElements()
  }

  createGrammarsButton(targetElement: HTMLElement) {
    const grammarsExtension = document.createElement('grammars-extension')
    // grammarsExtension.style.height = '24px'
    // grammarsExtension.style.width = '24px'
    grammarsExtension.style.position = 'absolute'
    grammarsExtension.style.right = '6px'
    grammarsExtension.style.bottom = '6px'
    // Slack
    // grammarsExtension.style.marginRight = '4px'
    // grammarsExtension.style.marginTop = '8px'
    targetElement.appendChild(grammarsExtension)
  }
}
