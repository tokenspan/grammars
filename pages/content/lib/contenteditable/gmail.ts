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
    const elements = document.querySelectorAll("*[contenteditable='true']")
    if (elements.length === 0) {
      return null
    }

    return elements[0] as HTMLElement
  }

  getInnerHTML(): string | null {
    return this.getInnerElement()?.innerHTML ?? null
  }

  getInnerText(): string | null {
    return this.getInnerElement()?.innerText ?? null
  }

  getComposerElements(): HTMLElement[] {
    const elements = document.querySelectorAll("*[contenteditable='true']")
    const allElements: HTMLElement[] = []
    for (const element of elements) {
      const htmlElement = element as HTMLElement
      allElements.push(htmlElement.parentElement as HTMLElement)
    }

    return allElements
  }

  createGrammarsButton(targetElement: HTMLElement) {
    const grammarsExtension = document.createElement('grammars-extension')
    grammarsExtension.style.position = 'absolute'
    grammarsExtension.style.right = '0px'
    grammarsExtension.style.bottom = '0px'
    targetElement.appendChild(grammarsExtension)
  }
}
