import Anthropic from '@anthropic-ai/sdk'
import type {
  BaseLLM,
  BaseLLMOptions,
  ChatCompletion,
  ChatCompletionCreateParams,
  ChatCompletionMessage,
  Choice,
} from './common'
import { ModelNotSupportedError } from './common'
import dayjs from 'dayjs'

export type AnthropicModel = 'claude-3-haiku-20240307'

export interface AnthropicLLMOptions extends BaseLLMOptions<'anthropic', AnthropicModel> {
  model: AnthropicModel
}

export class AnthropicLLM implements BaseLLM {
  private readonly client: Anthropic

  constructor(private readonly options: AnthropicLLMOptions) {
    this.client = new Anthropic({
      apiKey: options.apiKey,
      dangerouslyAllowBrowser: true,
    })
  }

  async complete(options: ChatCompletionCreateParams<AnthropicModel>): Promise<ChatCompletion> {
    const model = options.model ?? this.options.model
    if (!model) {
      throw new ModelNotSupportedError(model)
    }

    const chatCompletion = await this.client.messages.create({
      messages: options.messages.toReversed().map(message => ({
        role: message.role === 'system' ? 'assistant' : 'user',
        content: message.content,
      })),
      model,
      temperature: options.temperature,
      max_tokens: options.max_tokens ?? 1000,
    })

    const choices = chatCompletion.content
      .map(content => {
        if (content.type === 'text') {
          return {
            role: chatCompletion.stop_reason,
            finish_reason: 'stop',
            index: 0,
            message: {
              content: content.text,
              role: 'assistant',
            },
          } as Choice
        }

        return null
      })
      .filter(content => content !== null)

    return {
      choices,
      created_at: dayjs().toDate(),
      object: 'chat.completion',
      usage: {
        completion_tokens: chatCompletion.usage.output_tokens,
        prompt_tokens: chatCompletion.usage.input_tokens,
        total_tokens: chatCompletion.usage.output_tokens + chatCompletion.usage.input_tokens,
      },
      get firstChoice(): Choice | null {
        return choices[0] ?? null
      },
      get firstChoiceMessage(): ChatCompletionMessage | null {
        return choices[0]?.message ?? null
      },
    }
  }
}
