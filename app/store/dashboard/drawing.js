import firebase from '@/firebase'
import Drawing from '@/models/Drawing'

export const state = () => ({
  drawings: [],
  loading: false,
})

export const mutations = {
  fetchDrawingsStart(state) {
    state.loading = true
  },
  fetchDrawingsEnd(state, { drawings }) {
    state.loading = false
    state.drawings = drawings
  },
  prependDrawing(state, { drawing }) {
    state.drawings.unshift(drawing)
  },
  replaceDrawing(state, { index, drawing }) {
    state.drawings.splice(index, 1, drawing)
  }
}

export const actions = {
  async fetchDrawings({ commit }) {
    commit('fetchDrawingsStart')
    const drawingsDoc = await firebase.firestore().collection('drawings').orderBy('postedAt', 'desc').get()
    const drawings = drawingsDoc.docs.map(doc => {
      const data = doc.data()
      return new Drawing({
        ...data,
        id: doc.id,
        createdAt: data.createdAt.toDate(),
        postedAt: data.postedAt.toDate(),
      })
    })
    commit('fetchDrawingsEnd', { drawings })
  },
  async saveDrawing({ commit, state }, { drawing }) {
    const timestamp = new Date()
    let newDoc = false

    if (!drawing.id) {
      drawing.id = timestamp.getTime()
      newDoc = true
    }
    if (!drawing.createdAt) {
      drawing.createdAt = timestamp
    }
    drawing.postedAt = timestamp

    // 1. Upload image (if changed)
    if (drawing.imageFile) {
      const hash = await drawing.imageFile.calculateDigest()
      const ext = 'png' // Fixed value is OK because resizeToFit() always returns PNG image.
      const blob = await drawing.imageFile.resizeToFit(2048, 2048)

      const storageRef = firebase.storage().ref()
      const fileRef = storageRef.child(`drawings/${drawing.id}/${hash}.${ext}`)
      const file = await fileRef.put(blob)
      drawing.imageUrl = await file.ref.getDownloadURL()
    }

    // 2. Create/update the document
    const ref = firebase.firestore().doc(`drawings/${drawing.id}`)
    const document = {
      imageUrl: drawing.imageUrl,
      caption: drawing.caption,
      sourceUrl: drawing.sourceUrl,
      createdAt: drawing.createdAt,
      postedAt: drawing.postedAt,
      tags: drawing.tags,
      enableTweet: drawing.enableTweet,
    }
    await ref.set(document, { merge: true })

    // 3. Update state
    const index = state.drawings.findIndex(d => d.id === drawing.id)
    if (index >= 0) {
      commit('replaceDrawing', { index, drawing })
    } else {
      commit('prependDrawing', { drawing })
    }

    return { drawing, newDoc }
  },
}
