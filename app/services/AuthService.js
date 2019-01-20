import firebase from '~/firebase'

const emailForSignInKey = 'emailForSignIn'
const emailPromptMessage = 'ログイン時に入力したメールアドレスを入力してください'

export const sendSignInLink = async (email, redirectUrl) => {
  const actionCodeSettings = {
    url: redirectUrl,
    handleCodeInApp: true,
  }

  await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  window.localStorage.setItem(emailForSignInKey, email)
}

export const isMailLinkSignIn = (link) => {
  return firebase.auth().isSignInWithEmailLink(link)
}

export const completeMailLinkSignIn = async (link) => {
  let email = window.localStorage.getItem(emailForSignInKey)
  if (!email) {
    email = window.prompt(emailPromptMessage)
  }

  await firebase.auth().signInWithEmailLink(email, link)
  window.localStorage.removeItem(emailForSignInKey)
}
