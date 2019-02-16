import firebase from '@/firebase'
import Drawing from '@/models/Drawing'

function mapDocToDrawing(doc) {
  const data = doc.data()
  return new Drawing({
    ...data,
    id: doc.id,
    createdAt: data.createdAt.toDate(),
    postedAt: data.postedAt.toDate(),
  })
}

export const state = () => ({
  drawings: [],
})

export const mutations = {
  appendDrawings(state, { drawings }) {
    state.drawings = state.drawings.concat(drawings)
  },
}

export const actions = {
  async fetchDrawings({ commit }) {
    const drawingsDoc = await firebase.firestore().collection('drawings').orderBy('postedAt', 'desc').get()
    const drawings = drawingsDoc.docs.map(mapDocToDrawing)
    commit('appendDrawings', { drawings })
  },
  async fetchDrawing({ commit, state }, { drawingId }) {
    const drawing = state.drawings.find(d => d.id === drawingId)
    if (drawing) {
      return drawing
    }

    const doc = await firebase.firestore().doc(`drawings/${drawingId}`).get()
    if (!doc.exists) {
      return null
    }
    return mapDocToDrawing(doc)
  },
}
