import '@src/Options.css'
import { withErrorBoundary, withSuspense } from '@extension/shared'
import SuperTokens from 'supertokens-web-js'
import Session from 'supertokens-web-js/recipe/session'
import ThirdParty, {
  getAuthorisationURLWithQueryParamsAndSetState,
  signInAndUp,
} from 'supertokens-web-js/recipe/thirdparty'
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'
import { useEffect } from 'react'

SuperTokens.init({
  appInfo: {
    apiDomain: 'http://localhost:3001',
    apiBasePath: '/auth',
    appName: 'Grammars',
  },
  recipeList: [Session.init(), EmailPassword.init(), ThirdParty.init()],
})

const Options = () => {
  async function handleGoogleCallback() {
    try {
      const response = await signInAndUp()
      console.log('response', response)

      if (response.status === 'OK') {
        console.log('user', response.user)
        if (response.createdNewRecipeUser && response.user.loginMethods.length === 1) {
          // sign up successful
        } else {
          // sign in successful
        }
      } else if (response.status === 'SIGN_IN_UP_NOT_ALLOWED') {
        // the reason string is a user friendly message
        // about what went wrong. It can also contain a support code which users
        // can tell you so you know why their sign in / up was not allowed.
        console.log('reason', response.reason)
      } else {
        // SuperTokens requires that the third party provider
        // gives an email for the user. If that's not the case, sign up / in
        // will fail.

        // As a hack to solve this, you can override the backend functions to create a fake email for the user.

        console.log('No email provided by social login. Please use another form of login')
      }
    } catch (err: any) {
      console.log('err', err)
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        console.log('err', err.mesage)
      } else {
        console.log('Oops! Something went wrong.')
      }
    }
  }

  async function googleSignInClicked() {
    try {
      const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
        thirdPartyId: 'google',

        // This is where Google should redirect the user back after login or error.
        // This URL goes on the Google's dashboard as well.
        frontendRedirectURI: 'https://jkikhlhfikgokggbacjmopkabcgilcli.chromiumapp.org',
      })

      console.log('authUrl', authUrl)

      await chrome.runtime.sendMessage({
        action: 'signInWithGoogle',
        payload: {
          url: authUrl,
        },
      })
    } catch (error) {
      console.error('error', error)
    }
  }

  const listener = async (request, sender, sendResponse) => {
    console.log('request', request)
  }

  useEffect(() => {
    console.log('SuperTokens', SuperTokens)
    chrome.runtime.onMessage.addListener(listener)

    return () => {
      chrome.runtime.onMessage.removeListener(listener)
    }
  }, [])

  return (
    <>
      <div>
        <p>Hello World</p>
        <button onClick={googleSignInClicked}>Google Sign In</button>
      </div>
    </>
  )
}

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>)
