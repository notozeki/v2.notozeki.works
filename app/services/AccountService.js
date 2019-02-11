import firebase from '~/firebase'
import md5 from 'js-md5'

const getAdmin = async (uid) => {
  try {
    const doc = await firebase.firestore().doc(`admins/${uid}`).get()
    if (doc.exists) {
      return doc.data()
    } else {
      return null
    }
  } catch (error) {
    if (error.code === 'permission-denied') {
      // This case is OK because the user is not an admin.
      return null
    } else {
      throw error
    }
  }
}

export const onAccountChanged = (listener) => {
  firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      const admin = await getAdmin(user.uid)

      // Load icon from Gravatar
      // TODO: Use `user.photoUrl` after implementing account settings.
      let gravatarUrl = null
      if (user.email) {
        const hash = md5(user.email)
        gravatarUrl = `https://www.gravatar.com/avatar/${hash}`
      }

      listener({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        //icon: user.photoUrl,
        icon: gravatarUrl,
        isAdmin: !!admin,
      })
    } else {
      listener(null)
    }
  })
}
