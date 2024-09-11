import 'webextension-polyfill'

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log('request', request)
  if (request.action === 'signInWithGoogle') {
    try {
      const redirectUrl = await chrome.identity.launchWebAuthFlow({
        url: request.payload.url,
        interactive: true,
      })

      console.log('redirectUrl', redirectUrl)
    } catch (error) {
      console.error('error', error)
    }
  }
})
