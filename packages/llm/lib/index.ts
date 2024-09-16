import type { BaseLLM, ChatCompletion, ChatCompletionCreateParams } from './common'
import type { OpenAILLMOptions } from './openai'
import { OpenAILLM } from './openai'
import type { AnthropicLLMOptions } from './anthropic'
import { AnthropicLLM } from './anthropic'

export * from './common'

export type LLMOptions = OpenAILLMOptions | AnthropicLLMOptions

export class LLM implements BaseLLM {
  private readonly llm: BaseLLM

  constructor(options: LLMOptions) {
    switch (options.provider) {
      case 'openai':
        console.log('using openai')
        this.llm = new OpenAILLM(options)
        break
      case 'anthropic':
        console.log('using anthropic')
        this.llm = new AnthropicLLM(options)
        break
      default:
        throw new Error('LLM provider not supported')
    }
  }

  complete(options: ChatCompletionCreateParams): Promise<ChatCompletion> {
    return this.llm.complete(options)
  }
}
