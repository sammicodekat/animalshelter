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
  },
  updateAnimal(newAnimal,id){
    API.updateAnimal(newAnimal,id)
  },
  updateClient(newClient,id){
    API.updateClient(newClient,id)
  },
  unAdoptAnimal(id){
    API.unAdoptAnimal(id)
  },
  unAdoptClient(id){
    API.unAdoptClient(id)
  },
  deleteAnimal(id){
    API.deleteAnimal(id)
  },
  adoptAnimal(id,owner){
    API.adoptAnimal(id,owner)
  },
  deleteClient(id){
    API.deleteClient(id)
  },
  adoptClient(id,pet){
    API.adoptClient(id,pet)
  },
}

export default ClientsDataActions
