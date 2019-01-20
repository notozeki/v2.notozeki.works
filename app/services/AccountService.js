import firebase from '~/firebase'

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

      listener({
        uid: user.uid,
        name: user.displayName,
        icon: user.photoUrl,
        isAdmin: !!admin,
      })
    } else {
      listener(null)
    }
  })
}
