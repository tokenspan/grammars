import type { LLM } from '@extension/llm'
import { correctText, findDifferences } from '@extension/core'
import { applyPatch } from '@lib/utils'

export abstract class BaseContentEditable {
  constructor(private readonly llm: LLM) {
  }

  abstract findElements(): HTMLElement[]
  abstract createGrammarsButton(targetElement: HTMLElement): void
  abstract getInnerElement(): HTMLElement | null
  abstract getInnerHTML(): string | null
  abstract getInnerText(): string | null
  abstract getComposerElements(): HTMLElement[]

  async applyCorrection(): Promise<void> {
    const content = this.getInnerText()
    if (!content) {
      console.error('[grammars] failed to get inner text')
      return
    }

    const html = this.getInnerHTML()
    if (!html) {
      console.error('[grammars] failed to get inner html')
      return
    }

    const corrected = await correctText(this.llm, content)
    console.log('[grammars] corrected text', corrected)
    if (!corrected) {
      console.error('[grammars] failed to correct text')
      return
    }

    const patch = findDifferences(content, corrected)
    const patchedHtml = applyPatch(html, patch)

    const innerElement = this.getInnerElement()
    if (!innerElement) {
      return
    }

    innerElement.innerHTML = patchedHtml
  }

  injectGrammarsButton(): boolean {
    const elements = this.getComposerElements()

    for (const element of elements) {
      this.createGrammarsButton(element)
    }

    return elements.length > 0
  }
}
