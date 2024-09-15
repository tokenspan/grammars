import '@webcomponents/webcomponentsjs'
import { createRoot, type Root } from 'react-dom/client'
import styles from '../dist/assets/index.css?inline'
import { correctText } from '@extension/core'
import { apiKeyDataStorage } from '@extension/storage'
import { LLM } from '@extension/llm'

export const normalizeAttribute = (attribute: string) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

interface GrammarsExtensionProps {
  loading?: boolean
}

export const GrammarsExtension = ({ loading }: GrammarsExtensionProps) => {
  return (
    <div id="grammars-wrapper" className="bg-[#87a330] rounded p-1 cursor-pointer">
      {loading ? (
        <div role="status">
          <svg
            aria-hidden="true"
            className="size-4 text-white animate-spin fill-[#87a330]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 64 64"
          width="16px"
          height="16px"
          style={{ fill: '#fff' }}>
          <g>
            <g id="Layer_1">
              <g>
                <path
                  fill="#fff"
                  d="M32,45.5c-12.6,0-22.8-10.2-22.8-22.8S19.4,0,32,0s7.7,1,11,2.8l-4,7.2c-2.1-1.2-4.6-1.8-7.1-1.8-8,0-14.6,6.5-14.6,14.6s6.5,14.6,14.6,14.6,14.6-6.5,14.6-14.6h8.2c0,12.6-10.2,22.8-22.8,22.8Z"
                />
                <path
                  fill="#fff"
                  d="M44,50.1c-2.7,3.8-7.2,6.1-12,6.1s-9.2-2.3-12-6.1h-8.8c3.5,8.3,11.7,13.9,20.8,13.9s17.3-5.5,20.8-13.9h-8.8Z"
                />
              </g>
            </g>
          </g>
        </svg>
      )}
    </div>
  )
}

const createLLM = async () => {
  const { provider, model, apiKeys } = await apiKeyDataStorage.get()

  return new LLM({
    provider,
    model,
    apiKey: apiKeys[provider],
  })
}

class GrammarsExtensionComponent extends HTMLElement {
  private _llm?: LLM
  private root?: Root // Store the root for re-rendering
  private _loading: boolean = false // Private field for loading state

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this._onClick = this._onClick.bind(this)
    this.loading = false // Initialize loading state
    addEventListener('click', this._onClick)
  }

  async connectedCallback() {
    const props = this.getPropsFromAttributes<GrammarsExtensionProps>()
    this._llm = await createLLM()
    this._renderComponent(props) // Initial render with props
  }

  disconnectedCallback() {
    removeEventListener('click', this._onClick)
  }

  private getPropsFromAttributes<T>(): T {
    const props: Record<string, string> = {}

    for (let i = 0; i < this.attributes.length; i++) {
      const attribute = this.attributes[i]
      props[normalizeAttribute(attribute.name)] = attribute.value
    }

    return props as T
  }

  set loading(isLoading: boolean) {
    const wrapper = this.querySelector('#grammars-wrapper')
    if (isLoading) {
      wrapper?.setAttribute('loading', '')
    } else {
      wrapper?.removeAttribute('loading')
    }
    this._loading = isLoading
    this._renderComponent({ loading: this._loading })
  }

  get loading() {
    return this._loading
  }

  _renderComponent(props: GrammarsExtensionProps) {
    if (!this.root) {
      this.root = createRoot(this.shadowRoot as ShadowRoot)
    }

    this.root.render(
      <>
        <style>{styles}</style>
        <GrammarsExtension {...props} />
      </>,
    )
  }

  async _onClick(event: MouseEvent) {
    event.stopPropagation()
    event.preventDefault()
    const target = event.target as HTMLElement

    if (target.tagName !== 'GRAMMARS-EXTENSION') {
      return
    }

    const parent = target.parentElement

    if (parent) {
      for (const child of parent.children) {
        if ((child as HTMLElement).contentEditable === 'true') {
          const currentText = child.innerHTML

          if (!currentText) continue

          this.loading = true

          try {
            const corrected = await correctText(this._llm!, currentText)
            child.innerHTML = corrected ?? 'failed'
          } catch (e) {
            console.error('e====>', e)
          } finally {
            this.loading = false
          }
        }
      }
    }
  }
}

customElements.define('grammars-extension', GrammarsExtensionComponent)
