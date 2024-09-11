import { LLM } from '@extension/llm'
import { correctText } from '@extension/core'
import { apiKeyDataStorage } from '@extension/storage'

export function findEditableElements() {
  const allElements = document.querySelectorAll('*')
  const editableElements: HTMLElement[] = []

  allElements.forEach(element => {
    const el = element as HTMLElement
    if (el.isContentEditable || el.getAttribute('contenteditable') === 'true') {
      editableElements.push(el)
    }

    // contentEditable
    // input
    // textarea
  })
  console.log('editableElements', editableElements)
  return editableElements.length > 0
}

export function loadEditableContent() {
  const id = setInterval(() => {
    if (findEditableElements()) {
      if (id) {
        clearInterval(id)
      }
      console.log('loadEditableContent')
      injectGrammarsButton()
    }
  }, 1000)
}

export function injectGrammarsButton() {}

export async function applyCorrection() {}

export async function mount() {
  setTimeout(loadEditableContent, 2000)
}

void mount()

const createLLM = async () => {
  const { provider, model, apiKeys } = await apiKeyDataStorage.get()

  return new LLM({
    provider,
    model,
    apiKey: apiKeys[provider],
  })
}

async function bootstrap() {
  const llm = await createLLM()
  const tooltip = document.createElement('div')
  tooltip.classList.add('tokenspan-tooltip')
  const html = document.querySelector('html')
  html?.appendChild(tooltip)

  // Select all contenteditable elements
  // Select all input elements that allow typing
  const inputElements = document.querySelectorAll(
    'input[type="text"], input[type="search"], input[type="email"], input[type="url"], textarea, [contenteditable="true"]',
  )

  function addEventListenerList<T extends Event>(
    list: NodeListOf<Element> | Element[], // Accepts NodeList or array of elements
    event: string, // Event to listen for
    fn: (event: T) => void, // Function to handle the event
  ): void {
    for (let i = 0, len = list.length; i < len; i++) {
      list[i].addEventListener(event, fn as EventListener, false)
    }
  }

  const renderTooltip = (target: HTMLInputElement | HTMLTextAreaElement, cb: () => void) => {
    const rect = target.getBoundingClientRect()

    const tooltipWrapper = document.createElement('div')
    tooltipWrapper.classList.add('tokenspan-tooltip-wrapper')

    const tooltipIcon = document.createElement('div')
    tooltipIcon.classList.add('tokenspan-tooltip-icon')
    tooltipIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="24px" height="24px" viewBox="-2.4 -2.4 28.80 28.80" data-name="Layer 1" stroke="#000000" transform="rotate(0)">

<g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)">

<rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="3.4560000000000004" fill="#7e94ec" stroke-width="0"/>

</g>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier">

<path d="M20,5H13V4a1,1,0,0,0-2,0V5H4A1,1,0,0,0,4,7H15.88214a14.49252,14.49252,0,0,1-3.94067,7.95227A14.42561,14.42561,0,0,1,8.66406,9.67041a1.0002,1.0002,0,0,0-1.88867.65918,16.41412,16.41412,0,0,0,3.68012,5.95825,14.29858,14.29858,0,0,1-5.769,2.73511A1.00015,1.00015,0,0,0,4.89941,21a1.01758,1.01758,0,0,0,.21485-.023,16.297,16.297,0,0,0,6.831-3.31885A16.38746,16.38746,0,0,0,18.78711,20.977a1,1,0,0,0,.42578-1.9541,14.38226,14.38226,0,0,1-5.78955-2.73316A16.4802,16.4802,0,0,0,17.89233,7H20a1,1,0,0,0,0-2Z"/>

</g>

</svg>`

    tooltipWrapper.appendChild(tooltipIcon)
    const x = rect.x + rect.width - 30 + 'px'
    const y = rect.y + 10 + 'px'

    tooltipWrapper.style.position = 'absolute'
    tooltipWrapper.style.top = '0'
    tooltipWrapper.style.left = '0'
    tooltipWrapper.style.zIndex = '999'
    tooltipWrapper.style.transform = `translate(${x}, ${y})`

    tooltip.appendChild(tooltipWrapper)
    tooltipWrapper.addEventListener('click', cb)
  }

  const onmousedown = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    let currentText = ''
    if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') {
      const inputElement = target as HTMLInputElement
      const clickFn = async () => {
        const text = inputElement.value
        if (currentText === text) return console.log('no change')
        try {
          const corrected = await correctText(llm, text)
          inputElement.value = corrected ?? 'failed'
          currentText = corrected ?? text
        } catch (error) {
          console.error(error)
        }
      }
      renderTooltip(target as HTMLInputElement | HTMLTextAreaElement, clickFn)
    }

    if (target.isContentEditable) {
      const clickFn = async () => {
        const text = target.textContent ?? ''
        const corrected = await correctText(llm, text)
        target.textContent = corrected ?? 'failed'
      }
      renderTooltip(target as HTMLInputElement, clickFn)
    }
  }

  addEventListenerList(inputElements, 'focus', onmousedown)
}

// void bootstrap()
