import OpenAI from 'openai'
import type {
  BaseLLM,
  ChatCompletion,
  ChatCompletionCreateParams,
  ChatCompletionMessage,
  Choice,
  BaseLLMOptions,
} from './common'
import { ModelNotSupportedError } from './common'
import dayjs from 'dayjs'

export type OpenAIModel = 'gpt-3.5-turbo'

export interface OpenAILLMOptions extends BaseLLMOptions<'openai', OpenAIModel> {
  model: OpenAIModel
}

export class OpenAILLM implements BaseLLM {
  private readonly client: OpenAI

  constructor(private readonly options: OpenAILLMOptions) {
    this.client = new OpenAI({
      apiKey: options.apiKey,
      dangerouslyAllowBrowser: true,
    })
  }

  async complete(options: ChatCompletionCreateParams<OpenAIModel>): Promise<ChatCompletion> {
    const model = options.model ?? this.options.model
    if (!model) {
      throw new ModelNotSupportedError(model)
    }

    const messages = options.messages
    console.log('[grammars] openai messages', messages)

    const chatCompletion = await this.client.chat.completions.create({
      messages,
      model,
      temperature: options.temperature,
    })

    const choices = chatCompletion.choices

    console.log('[grammars] openai choices', choices)

    return {
      choices,
      created_at: dayjs.unix(chatCompletion.created).toDate(),
      object: 'chat.completion',
      usage: chatCompletion.usage,
      get firstChoice(): Choice | null {
        return choices[0] ?? null
      },
      get firstChoiceMessage(): ChatCompletionMessage | null {
        return choices[0]?.message ?? null
      },
    }
  }
}
