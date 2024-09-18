import type { BaseLLM, ChatCompletion, ChatCompletionCreateParams } from './common'
import type { OpenAILLMOptions } from './openai'
import { OpenAILLM } from './openai'
import type { AnthropicLLMOptions } from './anthropic'
import { AnthropicLLM } from './anthropic'

export * from './common'

export type LLMOptions = {
  model: string
  apiKey: string
}

export class LLM implements BaseLLM {
  private readonly llm: BaseLLM

  constructor(options: LLMOptions) {
    switch (options.model) {
      case 'gpt-3.5-turbo':
        console.log('[grammars] using openai')
        this.llm = new OpenAILLM({
          apiKey: options.apiKey,
          model: 'gpt-3.5-turbo',
          provider: 'openai'
        })
        break
      case 'claude-3-haiku-20240307':
        console.log('[grammars] using anthropic')
        this.llm = new AnthropicLLM({
          apiKey: options.apiKey,
          model: 'claude-3-haiku-20240307',
          provider: 'anthropic'
        })
        break
      default:
        throw new Error('LLM provider not supported')
    }
  }

  complete(options: ChatCompletionCreateParams): Promise<ChatCompletion> {
    return this.llm.complete(options)
  }
}
