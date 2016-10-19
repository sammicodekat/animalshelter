import API from '../API'
import AppDispatcher from '../AppDispatcher'

const ClientsDataActions = {

  addAnimal (animal) {
    API.addAnimal(animal)
  },
  addClient(client) {
    API.addClient(client)
  },
  getAnimals(){
    API.getAnimals()
  },
  getClients(){
    API.getClients()
  },
  getLonelyAnimals(){
    API.getLonelyAnimals()
  },
  getLonelyClients(){
    API.getLonelyClients()
  }
}

export default ClientsDataActions
