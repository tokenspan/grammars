import '@webcomponents/webcomponentsjs'
import { createRoot, type Root } from 'react-dom/client'
import tailwindcssOutput from '../dist/content-output.css?inline'
import type { FC} from 'react';
import { useMemo } from 'react'
import { ContentEditable } from '@lib/contenteditable'
import { useLLM, useStorage } from '@extension/shared'
import { configStorage } from '@extension/storage'

export const normalizeAttribute = (attribute: string) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

interface GrammarsExtensionProps {
  parentElement?: HTMLElement | null
}

export const GrammarsExtension: FC<GrammarsExtensionProps> = ({ parentElement }) => {
  const configData = useStorage(configStorage)

  const model = configData.model
  const apiKey = configData.apiKeys[model]

  const llm = useLLM({
    model,
    apiKey,
  })

  const website = useMemo(() => new ContentEditable(configData.currentTabHost, llm), [configData.currentTabHost, llm])

  return (
    <div id="grammars-wrapper" className="bg-[#87a330] rounded p-1 cursor-pointer">
      <span
        onClick={async () => {
          await website.applyCorrection()
        }}>
        G
      </span>
    </div>
  )
}

class GrammarsExtensionComponent extends HTMLElement {
  private root?: Root // Store the root for re-rendering

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  async connectedCallback() {
    const props = this.getPropsFromAttributes<GrammarsExtensionProps>()
    this._renderComponent({ ...props, parentElement: this.shadowRoot?.parentElement }) // Initial render with props
  }

  disconnectedCallback() {}

  private getPropsFromAttributes<T>(): T {
    const props: Record<string, string> = {}

    for (let i = 0; i < this.attributes.length; i++) {
      const attribute = this.attributes[i]
      props[normalizeAttribute(attribute.name)] = attribute.value
    }

    return props as T
  }

  _renderComponent(props: GrammarsExtensionProps) {
    if (!this.root) {
      this.root = createRoot(this.shadowRoot as ShadowRoot)
    }

    this.root.render(
      <>
        <style>{tailwindcssOutput}</style>
        <GrammarsExtension {...props} />
      </>,
    )
  }
}

customElements.define('grammars-extension', GrammarsExtensionComponent)
