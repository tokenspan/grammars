export * from './errors'

export interface BaseLLMOptions<TProvider extends string, TModel extends string> {
  provider: TProvider
  apiKey: string
  model?: TModel
}

export interface ChatCompletionSystemMessageParams {
  role: 'system'
  content: string
}

export interface ChatCompletionUserMessageParams {
  role: 'user'
  content: string
}

export type ChatCompletionMessageParams = ChatCompletionSystemMessageParams | ChatCompletionUserMessageParams

export interface ChatCompletionCreateParams<TModel extends string = string> {
  model?: TModel
  messages: ChatCompletionMessageParams[]
  max_tokens?: number
  temperature?: number
}

export interface Usage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export interface ChatCompletionMessage {
  content: string | null
  role: 'assistant'
}

export interface Choice {
  index: number
  message: ChatCompletionMessage
  finish_reason: string
}

export interface ChatCompletion {
  object: 'chat.completion'
  usage?: Usage
  choices: Choice[]
  created_at: Date
  get firstChoice(): Choice | null
  get firstChoiceMessage(): ChatCompletionMessage | null
}

export interface BaseLLM {
  complete(options: ChatCompletionCreateParams): Promise<ChatCompletion>
}
