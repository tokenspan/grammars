import 'webextension-polyfill'
import { configStorage } from '@extension/storage'

chrome.tabs.onActivated.addListener(async activeInfo => {
  console.log('activeInfo', activeInfo)
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })

  console.log('tab', tab?.url)
  const config = await configStorage.get()

  if (tab?.url) {
    const hostname = new URL(tab.url).hostname
    await configStorage.set({ ...config, currentTabHost: hostname })
  }
})
