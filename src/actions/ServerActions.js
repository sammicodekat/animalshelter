import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  gotAnimal (animal) {
    AppDispatcher.dispatch({
      type: 'GOT_ANIMALS',
      payload: animal
    })
  },
  gotClient (client) {
    AppDispatcher.dispatch({
      type: 'GOT_CLIENTS',
      payload: client
    })
  },
  gotLonelyAnimal (animal) {
    AppDispatcher.dispatch({
      type: 'GOT_LONELY_ANIMALS',
      payload: animal
    })
  },
  gotLonelyClient (client) {
    AppDispatcher.dispatch({
      type: 'GOT_LONELY_CLIENTS',
      payload: client
    })
  }
}
export default ServerActions
