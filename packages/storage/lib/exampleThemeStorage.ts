import { createStorage } from './base'
import { StorageEnum } from './enums'
import { BaseStorage } from './types'

export type Theme = 'light' | 'dark'

export type ThemeStorage = BaseStorage<Theme> & {
  toggle: () => Promise<void>
}

const storage = createStorage<Theme>('theme-storage-key', 'light', {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
})

// You can extend it with your own methods
export const exampleThemeStorage: ThemeStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentTheme => {
      return currentTheme === 'light' ? 'dark' : 'light'
    })
  },
}
