import axios, { get, post,put } from 'axios'
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
  },
  updateAnimal(newAnimal,id){
    put(`/api/animals/update/${id}`,newAnimal)
    .then(res => {
      ServerActions.gotAnimal(res.data)
    })
    .catch(console.error)
  },
  updateClient(newClient,id){
    put(`/api/clients/update/${id}`,newClient)
    .then(res => {
      ServerActions.gotClient(res.data)
    })
    .catch(console.error)
  },
  unAdoptAnimal(id){
    put(`/api/animals/unadopt/${id}`)
    .then(res => {
      ServerActions.gotAnimal(res.data)
    })
    .catch(console.error)
  },
  unAdoptClient(id){
    put(`/api/clients/unadopt/${id}`)
    .then(res => {
      ServerActions.gotClient(res.data)
    })
    .catch(console.error)
  },
  adoptAnimal(id,owner){
    put(`/api/animals/adopt/${id}/${owner}`)
    .then(res => {
      ServerActions.gotLonelyAnimal(res.data)
    })
    .catch(console.error)
  },
  adoptClient(id,pet){
    put(`/api/clients/adopt/${id}/${pet}`)
    .then(res => {
      ServerActions.gotLonelyClient(res.data)
    })
    .catch(console.error)
  },
  deleteAnimal(id){
    axios.delete(`/api/animals/update/${id}`)
    .then(res => {
      ServerActions.gotLonelyAnimal(res.data)
    })
    .catch(console.error)
  },
  deleteClient(id){
    axios.delete(`/api/clients/update/${id}`)
    .then(res => {
      ServerActions.gotLonelyClient(res.data)
    })
    .catch(console.error)
  }
}

export default API
