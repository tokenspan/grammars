import { BaseContentEditable } from '@lib/contenteditable/types'
import { SlackPage } from '@lib/contenteditable/slack'
import { GmailPage } from '@lib/contenteditable/gmail'
import type { LLM } from '@extension/llm'

export type SupportedHost = string

export class ContentEditable extends BaseContentEditable {
  private readonly page: BaseContentEditable

  constructor(host: SupportedHost, llm: LLM) {
    super(llm)

    switch (host) {
      case 'app.slack.com':
        this.page = new SlackPage(llm)
        break
      case 'mail.google.com':
        this.page = new GmailPage(llm)
        break
      default:
        console.error('[grammars] website not supported', host)
        throw new Error('Website not supported')
    }
  }

  findElements(): HTMLElement[] {
    return this.page.findElements()
  }

  getInnerElement(): HTMLElement | null {
    return this.page.getInnerElement()
  }

  getInnerHTML(): string | null {
    return this.page.getInnerHTML()
  }

  getInnerText(): string | null {
    return this.page.getInnerText()
  }

  async applyCorrection(): Promise<void> {
    return this.page.applyCorrection()
  }

  createGrammarsButton(targetElement: HTMLElement) {
    this.page.createGrammarsButton(targetElement)
  }
}
