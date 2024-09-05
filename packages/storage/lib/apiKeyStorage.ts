import { createStorage } from './base'
import { StorageEnum } from './enums'

interface ApiKeyData {
  provider: string
  model: string
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
