import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { List,Item, Image, Label, Icon, Grid, Button, Card, Modal } from 'semantic-ui-react'

import ClientsDataStore from '../stores/ClientsDataStore'
import ClientsDataActions from '../actions/ClientsDataActions'
import UpdateClient from './UpdateClient'

export default class ClientList extends Component {
  constructor() {
    super();
    this.state={
      clients: ClientsDataStore.getClients(),
      open:false,
      idx:1
    }
    this._onChange = this._onChange.bind(this);
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.select = this.select.bind(this);
  }

  componentWillMount () {
    ClientsDataStore.startListening(this._onChange)
    ClientsDataActions.getClients()
  }

  componentWillUnmount () {
    ClientsDataStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      clients: ClientsDataStore.getClients()
    })
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

  unadopt(id,petId){
    ClientsDataActions.unAdoptClient(id);
    ClientsDataActions.unAdoptAnimal(petId);
  }

    render() {
      let { clients, open, idx } = this.state
      let Clients= '';

      if(clients){
        Clients = clients.map( client => {
          let {name , id , gender, image, info, animalName, age, details, petId } = client ;

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
                <Card.Meta>
                  Owns: {animalName} <Button size='mini' color='red' onClick={this.unadopt.bind(null,id,petId)}>Unadopt</Button>
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
