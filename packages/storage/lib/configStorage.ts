import { createStorage } from './base'
import { StorageEnum } from './enums'

interface ConfigData {
  model: string
  currentTabHost: string
  disabledHosts: string[]
  apiKeys: Record<string, string>
}

const storage = createStorage<ConfigData>(
  'config',
  {
    model: 'gpt-3.5-turbo',
    currentTabHost: '',
    disabledHosts: [],
    apiKeys: {} as Record<string, string>,
  },
  {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
  },
)

export const configStorage = storage
