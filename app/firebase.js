import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'
import '@firebase/storage'

const config = {
  apiKey: 'AIzaSyByqKBn4vTu_zdo9iInevk4wXqGuCuFPWs',
  authDomain: 'notozeki-works.firebaseapp.com',
  databaseURL: 'https://notozeki-works.firebaseio.com',
  projectId: 'notozeki-works',
  storageBucket: 'notozeki-works.appspot.com',
  messagingSenderId: '298063783191',
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

export default firebase
