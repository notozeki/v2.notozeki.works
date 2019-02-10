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
}

export const actions = {
  async fetchDrawings({ commit }) {
    commit('fetchDrawingsStart')
    const drawingsDoc = await firebase.firestore().collection('drawings').orderBy('postedAt', 'desc').get()
    const drawings = drawingsDoc.docs.map(doc => new Drawing({
      id: doc.id,
      ...doc.data(),
    }))
    commit('fetchDrawingsEnd', { drawings })
  },
}
