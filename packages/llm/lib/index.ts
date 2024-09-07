import type { BaseLLM, ChatCompletion, ChatCompletionCreateParams } from './common'
import type { OpenAILLMOptions } from './openai'
import { OpenAILLM } from './openai'

export * from './common'

export type LLMOptions = OpenAILLMOptions

export class LLM implements BaseLLM {
  private readonly llm: BaseLLM

  constructor(options: LLMOptions) {
    switch (options.provider) {
      case 'openai':
        this.llm = new OpenAILLM(options)
        break
      default:
        throw new Error('LLM provider not supported')
    }
  }

  complete(options: ChatCompletionCreateParams): Promise<ChatCompletion> {
    return this.llm.complete(options)
  }
}
