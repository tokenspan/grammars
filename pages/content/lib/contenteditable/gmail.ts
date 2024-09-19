import { BaseContentEditable } from '@lib/contenteditable/types'

export class GmailPage extends BaseContentEditable {
  findElements(): HTMLElement[] {
    const elements = document.querySelectorAll("*[contenteditable='true']")
    const allElements: HTMLElement[] = []
    for (const element of elements) {
      allElements.push(element as HTMLElement)
    }

    return allElements
  }

  getInnerElement(): HTMLElement | null {
    throw new Error('Method not implemented.')
  }

  getInnerHTML(): string | null {
    throw new Error('Method not implemented.')
  }

  getInnerText(): string | null {
    throw new Error('Method not implemented.')
  }

  getEditableContent<T>(): T {
    throw new Error('Method not implemented.')
  }

  getComposerElements(): HTMLElement[] {
    const elements = document.querySelectorAll("#\\:n0 > div")
    const allElements: HTMLElement[] = []
    for (const element of elements) {
      allElements.push(element as HTMLElement)
    }

    return allElements
  }

  createGrammarsButton(targetElement: HTMLElement) {
    const grammarsExtension = document.createElement('grammars-extension')
    grammarsExtension.style.position = 'absolute'
    grammarsExtension.style.right = '0px'
    grammarsExtension.style.bottom = '8px'
    targetElement.appendChild(grammarsExtension)
  }
}
