import { createStorage } from './base'
import { StorageEnum } from './enums'
import type { LLMOptions } from '@extension/llm'

interface ApiKeyData {
  provider: LLMOptions['provider']
  model: LLMOptions['model']
  apiKeys: Record<LLMOptions['provider'], string>
}

const storage = createStorage<ApiKeyData>(
  'api-key',
  {
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    apiKeys: {} as Record<LLMOptions['provider'], string>,
  },
  {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
  },
)

export const apiKeyDataStorage = storage
