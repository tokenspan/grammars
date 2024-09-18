// import { JSDOM } from 'jsdom'

interface PatchElement {
  text?: string
  remove?: string
  add?: string
}

export class TextNodeCursor {
  textNodes: Text[]
  nodeIndex: number = 0
  offset: number = 0

  constructor(textNodes: Text[]) {
    this.textNodes = textNodes
  }

  peek(len: number): string {
    let result = ''
    let idx = this.nodeIndex
    let offset = this.offset
    while (result.length < len && idx < this.textNodes.length) {
      const textNode = this.textNodes[idx]
      const text = textNode.data
      const remainingText = text.substring(offset)
      const toTake = Math.min(len - result.length, remainingText.length)
      result += remainingText.substring(0, toTake)

      if (toTake + offset >= text.length) {
        idx++
        offset = 0
      } else {
        offset += toTake
      }
    }
    return result
  }

  consume(len: number): void {
    let remaining = len
    while (remaining > 0 && this.nodeIndex < this.textNodes.length) {
      const textNode = this.textNodes[this.nodeIndex]
      const text = textNode.data
      const remainingText = text.length - this.offset
      const toConsume = Math.min(remaining, remainingText)
      this.offset += toConsume
      remaining -= toConsume

      if (this.offset >= text.length) {
        this.nodeIndex++
        this.offset = 0
      }
    }

    if (remaining > 0) {
      throw new Error('Not enough text to consume')
    }
  }

  replace(len: number, newText: string): void {
    let remaining = len
    let currentIndex = this.nodeIndex
    let currentOffset = this.offset

    const nodesToUpdate: { node: Text; start: number; end: number }[] = []
    while (remaining > 0 && currentIndex < this.textNodes.length) {
      const textNode = this.textNodes[currentIndex]
      const text = textNode.data
      const start = currentOffset
      const end = Math.min(text.length, currentOffset + remaining)
      nodesToUpdate.push({ node: textNode, start, end })
      remaining -= end - start
      currentIndex++
      currentOffset = 0
    }

    if (remaining > 0) {
      throw new Error('Not enough text to replace')
    }

    let newTextContent = ''
    newTextContent += nodesToUpdate[0].node.data.substring(0, nodesToUpdate[0].start)
    newTextContent += newText
    const lastNode = nodesToUpdate[nodesToUpdate.length - 1]
    newTextContent += lastNode.node.data.substring(lastNode.end)

    nodesToUpdate[0].node.data = newTextContent

    for (let i = 1; i < nodesToUpdate.length; i++) {
      const nodeToRemove = nodesToUpdate[i].node
      const parent = nodeToRemove.parentNode
      if (parent) {
        parent.removeChild(nodeToRemove)
      }
    }

    this.textNodes.splice(this.nodeIndex + 1, nodesToUpdate.length - 1)

    this.offset = nodesToUpdate[0].start + newText.length

    if (this.offset >= nodesToUpdate[0].node.data.length) {
      this.nodeIndex++
      this.offset = 0
    }
  }
}

export function applyPatch(html: string, patch: PatchElement[]): string {
  // Wrap the HTML in a root element to parse it as well-formed XML
  const wrappedHtml = `<root>${html}</root>`

  // const dom = new JSDOM(wrappedHtml)
  // const doc = dom.window.document
  const parser = new DOMParser();
  const doc = parser.parseFromString(wrappedHtml, 'application/xml');

  const textNodes: Text[] = []

  function collectTextNodes(node: Node) {
    if (node.nodeType === 3) {
      // Node.TEXT_NODE
      textNodes.push(node as Text)
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        collectTextNodes(node.childNodes[i])
      }
    }
  }

  collectTextNodes(doc.documentElement)

  const cursor = new TextNodeCursor(textNodes)

  for (const element of patch) {
    if (element.text !== undefined) {
      const expectedText = element.text
      const actualText = cursor.peek(expectedText.length)
      if (actualText !== expectedText) {
        throw new Error(`Text mismatch: expected "${expectedText}", found "${actualText}"`)
      }
      cursor.consume(expectedText.length)
    } else if (element.remove !== undefined && element.add !== undefined) {
      const removeText = element.remove
      const actualText = cursor.peek(removeText.length)
      if (actualText !== removeText) {
        throw new Error(`Text mismatch: expected to remove "${removeText}", found "${actualText}"`)
      }
      cursor.replace(removeText.length, element.add)
    } else {
      throw new Error('Invalid patch element')
    }
  }

  // Serialize the document back to HTML
  const root = doc.getElementsByTagName('root')
  return root[0]?.innerHTML ?? null
}
