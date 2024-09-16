import { SlackSite } from '@lib/websites/slack'

export interface BaseWebsite {
  findEditableElements(): HTMLElement[]
}

export type SupportedWebsite = 'app.slack.com'

export class Website implements BaseWebsite {
  private readonly site: BaseWebsite

  constructor(site: SupportedWebsite) {
    switch (site) {
      case 'app.slack.com':
        this.site = new SlackSite()
        break
      default:
        throw new Error('Website not supported')
    }
  }

  findEditableElements(): HTMLElement[] {
    return this.site.findEditableElements()
  }
}
