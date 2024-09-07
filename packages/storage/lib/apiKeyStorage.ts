import { createStorage } from './base'
import { StorageEnum } from './enums'
import type { LLMOptions } from '@extension/llm'

interface ApiKeyData {
  provider: LLMOptions['provider']
  model: LLMOptions['model']
  apiKey: string
}

const storage = createStorage<ApiKeyData>(
  'api-key',
  {
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    apiKey: '',
  },
  {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
  },
)

export const apiKeyDataStorage = storage
