import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { List,Item, Image, Label, Icon, Card,Grid,Button,Modal } from 'semantic-ui-react'
import ClientsDataStore from '../stores/ClientsDataStore'
import ClientsDataActions from '../actions/ClientsDataActions'
import UpdateAnimal from './UpdateAnimal'

export default class AnimalList extends Component {
  constructor() {
    super();
    this.state={
      animals: ClientsDataStore.getAnimals(),
      open:false,
      idx:1,
      color:'yellow'
    }
    this._onChange = this._onChange.bind(this);
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.select = this.select.bind(this);
  }

  componentWillMount () {
    ClientsDataStore.startListening(this._onChange);
    ClientsDataActions.getAnimals();
  }

  componentWillUnmount () {
    ClientsDataStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ animals: ClientsDataStore.getAnimals() });
  }

  show(){
    this.setState({ open: true });
  }

  close(){
    this.setState({ open: false });
  }

  select(id){
    this.setState({
      idx: id,
      color:'yellow'
    });
  }
  unadopt(id,clientId){
    ClientsDataActions.unAdoptAnimal(id);
    ClientsDataActions.unAdoptClient(clientId);
  }

  render() {
    let { animals, open, idx, color } = this.state;
    let Animals = '';

    if(animals){
      Animals = animals.map(animal => {
        let { name, id, breed, gender, image, size, characters, clientName, age, details,clientId } = animal;
        return (
          <Card key ={id} onClick={() => this.select(id)} color={color} className='card'>
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
              <Card.Meta>
                Owner: {clientName} <Button size='mini' color='red' onClick={this.unadopt.bind(null,id,clientId)}>Unadopt</Button>
            </Card.Meta>
            <Card.Description>
              {details}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button color='green' onClick={this.show}>Update Info</Button>
          </Card.Content>
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
    </Grid>)
  }
}
