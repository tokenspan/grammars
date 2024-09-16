import type { BaseWebsite } from '@lib/websites/index'

export class SlackSite implements BaseWebsite {
  findEditableElements(): HTMLElement[] {
    const allElements = document.getElementsByClassName('ql-container')
    const editableElements: HTMLElement[] = []

    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i] as HTMLElement
      editableElements.push(element)
    }

    return editableElements
  }
}
