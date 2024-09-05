import { createStorage } from './base'
import { exampleThemeStorage } from './exampleThemeStorage'
import { apiKeyDataStorage } from './apiKeyStorage'
import { SessionAccessLevelEnum, StorageEnum } from './enums'
import type { BaseStorage } from './types'

export { apiKeyDataStorage, exampleThemeStorage, createStorage, StorageEnum, SessionAccessLevelEnum }
export type { BaseStorage }
