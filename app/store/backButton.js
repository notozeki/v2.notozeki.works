export const state = () => ({
  route: null,
})

export const mutations = {
  setRoute(state, route) {
    state.route = route
  },
  clear(state) {
    state.route = null
  },
}
