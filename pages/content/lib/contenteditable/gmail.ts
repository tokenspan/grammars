import { BaseContentEditable } from '@lib/contenteditable/types'

export class GmailPage extends BaseContentEditable {
  getInnerElement(): HTMLElement | null {
    throw new Error('Method not implemented.')
  }

  getInnerHTML(): string | null {
    throw new Error('Method not implemented.')
  }

  getInnerText(): string | null {
    throw new Error('Method not implemented.')
  }

  findElements(): HTMLElement[] {
    const elements = document.querySelectorAll("*[contenteditable='true']")
    const allElements: HTMLElement[] = []
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement
      allElements.push(element)
    }

    return allElements
  }

  getEditableContent<T>(): T {
    throw new Error('Method not implemented.')
  }

  createGrammarsButton(targetElement: HTMLElement) {
    const grammarsExtension = document.createElement('grammars-extension')
    grammarsExtension.style.height = '24px'
    grammarsExtension.style.width = '24px'
    // Slack
    grammarsExtension.style.marginRight = '5px'
    grammarsExtension.style.marginTop = '8px'
    targetElement.appendChild(grammarsExtension)
  }
}
