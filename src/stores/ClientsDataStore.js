import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _animals = ''
let _clients = ''
let _lanimals =''
let _lclients =''

class ClientsDataStore extends EventEmitter {
  constructor () {
    super()
    AppDispatcher.register(action => {
      switch (action.type) {
        case 'GOT_ANIMALS':
        _animals = action.payload
        this.emit('CHANGE')
        break
        case 'GOT_CLIENTS':
        _clients = action.payload
        this.emit('CHANGE')
        break
        case 'GOT_LONELY_ANIMALS':
        _lanimals = action.payload
        this.emit('CHANGE')
        break
        case 'GOT_LONELY_CLIENTS':
        _lclients = action.payload
        this.emit('CHANGE')
        break
      }
    })
  }

  startListening (cb) {
    this.on('CHANGE', cb)
  }

  stopListening (cb) {
    this.removeListener('CHANGE', cb)
  }

  getAnimals () {
    return _animals
  }

  getClients () {
    return _clients
  }
  getLonelyAnimals(){
    return _lanimals
  }
  getLonelyClients(){
    return _lclients
  }
}

export default new ClientsDataStore()
