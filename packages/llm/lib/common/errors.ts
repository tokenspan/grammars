export class LLMError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LLMError'
  }
}

export class ModelNotSupportedError extends LLMError {
  constructor(model: string) {
    super(`model ${model} is not supported`)
  }
}
