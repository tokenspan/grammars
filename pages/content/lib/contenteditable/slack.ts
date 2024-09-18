import { BaseContentEditable } from '@lib/contenteditable/types'

export class SlackPage extends BaseContentEditable {
  findElements(): HTMLElement[] {
    const allElements = document.getElementsByClassName('ql-container')
    const editableElements: HTMLElement[] = []

    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i] as HTMLElement
      editableElements.push(element)
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

  createGrammarsButton(targetElement: HTMLElement) {
    const grammarsExtension = document.createElement('grammars-extension')
    grammarsExtension.style.height = '24px'
    grammarsExtension.style.width = '24px'
    // Slack
    grammarsExtension.style.marginRight = '4px'
    grammarsExtension.style.marginTop = '8px'
    targetElement.appendChild(grammarsExtension)
  }
}
