export default function ({ route, store }) {
  switch (route.name) {
  case 'drawings-id':
    store.commit('backButton/setRoute', '/drawings')
    break
  default:
    store.commit('backButton/clear')
    break
  }
}
