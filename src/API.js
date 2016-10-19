import { get, post } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  addAnimal(animal){
    post('/api/animals/', animal)
    .then(res => {
      ServerActions.gotAnimal(res.data)
    })
    .catch(console.error)
  },
  addClient(client){
    post('/api/clients/', client)
    .then(res => {
      ServerActions.gotClient(res.data)
    })
    .catch(console.error)
  },
  getClients(client){
    get('/api/clients/')
    .then(res => {
      ServerActions.gotClient(res.data)
    })
    .catch(console.error)
  },
  getAnimals(){
    get('/api/animals/')
    .then(res => {
      ServerActions.gotAnimal(res.data)
    })
    .catch(console.error)
  },
  getLonelyClients(){
    get('/api/clients/lonely')
    .then(res => {
      ServerActions.gotLonelyClient(res.data)
    })
    .catch(console.error)
  },
  getLonelyAnimals(){
    get('/api/animals/lonely')
    .then(res => {
      ServerActions.gotLonelyAnimal(res.data)
    })
    .catch(console.error)
  }
}

export default API
