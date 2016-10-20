import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { List,Item, Image, Label, Icon, Card,Grid,Button,Modal,Dropdown} from 'semantic-ui-react'
import ClientsDataStore from '../stores/ClientsDataStore'
import ClientsDataActions from '../actions/ClientsDataActions'
import UpdateAnimal from './UpdateAnimal'

export default class LonelyAnimal extends Component {
  constructor() {
    super();
    this.state={
      animals: ClientsDataStore.getLonelyAnimals(),
      clients: ClientsDataStore.getLonelyClients(),
      open:false,
      idx:1,
      owner:1
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
    this.setState({
      idx: id,
      color:'yellow'
    });
  }

  deleteAnimal(id){
    ClientsDataActions.deleteAnimal(id)
  }

  adoptAnimal(id,owner){
    ClientsDataActions.adoptAnimal(id,owner)
    ClientsDataActions.adoptClient(owner,id)
  }

  handleChange(e,{value}){
    this.setState({ owner: value });
  }

  render() {
    let { animals, open, idx, clients, owner } = this.state
    let Animals = '';
    const options =[];
    let Option = ''
    if(clients){
      clients.map(c => options.push({text:c.name,value:c.id}))
    }
    if(options!=[]){
    Option = (<Dropdown placeholder='Owner' options={options} onChange={this.handleChange} selection fluid header='Select a owner' />)
    }

    if(animals){
      Animals = animals.map( animal => {
        let {name , id , breed , gender, image, size, characters, clientName, age, details} = animal ;

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
                Breed: {breed}
              </Card.Meta>
              <Card.Meta>
                Characters: {characters}
              </Card.Meta>
              <Card.Meta>
                Size: {size}
              </Card.Meta>
              <Card.Description>
                {details}
              </Card.Description>
            </Card.Content>
            <Card.Content extra >
              {Option}
              <Button.Group>
              <Button color='green' onClick={this.show}>Update Info</Button>
              <Button.Or />
              <Button color='orange' onClick={() => this.adoptAnimal(id,owner)}>Adopt</Button>
              </Button.Group>
            </Card.Content>
            <Button floated='left' color='red' circular onClick={() => this.deleteAnimal(id)} icon='trash'/>
          </Card>
        )
      })
    }
    return (
      <Grid textAlign='center'>
        <Card.Group>
          {Animals}
        </Card.Group>
        <Modal dimmer='blurring' open={open} onClose={this.close}>
          <Modal.Header>Edit</Modal.Header>
          <Modal.Content>
            <UpdateAnimal animals ={animals} id={idx}/>
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
