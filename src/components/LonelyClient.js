import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { List,Item, Image, Label, Icon, Card,Grid,Button,Modal,Dropdown} from 'semantic-ui-react'
import ClientsDataStore from '../stores/ClientsDataStore'
import ClientsDataActions from '../actions/ClientsDataActions'
import UpdateClient from './UpdateClient'

export default class LonelyClient extends Component {
  constructor() {
    super();
    this.state={
      clients: ClientsDataStore.getLonelyClients(),
      animals: ClientsDataStore.getLonelyAnimals(),
      open:false,
      idx:1,
      pet:1
    }
    this._onChange = this._onChange.bind(this);
    this.show=this.show.bind(this);
    this.close=this.close.bind(this);
    this.handleChange= this.handleChange.bind(this);
  }

  componentWillMount () {
    ClientsDataStore.startListening(this._onChange);
    ClientsDataActions.getLonelyAnimals();
    ClientsDataActions.getLonelyClients();
  }
  componentWillUnmount () {
    ClientsDataStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      animals: ClientsDataStore.getLonelyAnimals(),
      clients: ClientsDataStore.getLonelyClients()
    })
  }

  show(){
    this.setState({ open: true })
  }

  close(){
    this.setState({ open: false })
  }

  select(id){
    this.setState({ idx: id});
  }

  deleteClient(id){
    ClientsDataActions.deleteClient(id)
  }

  adoptClient(id,pet){
    ClientsDataActions.adoptClient(id,pet)
    ClientsDataActions.adoptAnimal(pet,id)
  }

  handleChange(e,{value}){
    this.setState({ pet: value });
  }

  render() {
    let { clients, animals, pet, open, idx } = this.state
    let Clients= '';
    const options =[];
    let Option = ''
    if(animals){
      animals.map(c => options.push({text:c.name,value:c.id}))
    }
    if(options!=[]){
    Option = (<Dropdown placeholder='Pet' options={options} onChange={this.handleChange} selection fluid header='Select a pet to adopt' />)
    }

    if(clients){
      Clients = clients.map( client => {
        let {name , id , gender, image, info, animalName, age, details} = client ;

        return (
          <Card key ={id} onClick={() => this.select(id)} className='card'>
            <Image src={image} size='medium' className='img'/>
            <Card.Content>
              <Card.Header>
                {name}
              </Card.Header>
              <Card.Meta>
                Age: {age}
              </Card.Meta>
              <Card.Meta>
                Gender: {gender}
              </Card.Meta>
              <Card.Meta>
                Info: {info}
              </Card.Meta>
              <Card.Description>
                {details}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              {Option}
              <Button.Group>
              <Button color='green' onClick={this.show}>Update Info</Button>
              <Button.Or />
              <Button color='orange' onClick={() => this.adoptClient(id,pet)}>Adopt Animal</Button>
              </Button.Group>
            </Card.Content>
              <Button floated='left' color='red' circular onClick={() => this.deleteClient(id)} icon='trash'/>
          </Card>
        )
      })
    }

    return (
      <Grid textAlign='center'>
        <Card.Group>
          {Clients}
        </Card.Group>
        <Modal dimmer='blurring' open={open} onClose={this.close}>
          <Modal.Header>Edit</Modal.Header>
          <Modal.Content>
            <UpdateClient clients ={clients} id={idx}/>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.close}>
              Go Back
            </Button>
          </Modal.Actions>
        </Modal>
      </Grid>
    )
  }
}
