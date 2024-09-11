import '@webcomponents/webcomponentsjs'
import { createRoot } from 'react-dom/client'

export const normalizeAttribute = (attribute: string) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

interface GrammarsIconProps {}

export const GrammarsIcon = ({}: GrammarsIconProps) => {
  return (
    <div>
      <span>Grammars</span>
    </div>
  )
}

class GrammarsIconComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes<GrammarsIconProps>()
    const root = createRoot(this.shadowRoot as ShadowRoot)
    root.render(<GrammarsIcon {...props} />)
  }

  private getPropsFromAttributes<T>(): T {
    const props: Record<string, string> = {}

    for (let i = 0; i < this.attributes.length; i++) {
      const attribute = this.attributes[i]
      props[normalizeAttribute(attribute.name)] = attribute.value
    }

    return props as T
  }
}

customElements.define('grammars-icon', GrammarsIconComponent)
