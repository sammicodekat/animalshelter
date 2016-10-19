import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { List,Item, Image, Label, Icon, Grid, Button, Card } from 'semantic-ui-react'

import ClientsDataStore from '../stores/ClientsDataStore'
import ClientsDataActions from '../actions/ClientsDataActions'

export default class LonelyClient extends Component {
  constructor() {
    super();
    this.state={
      clients: ClientsDataStore.getLonelyClients()
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    ClientsDataStore.startListening(this._onChange)
    ClientsDataActions.getLonelyClients()
  }
  componentWillUnmount () {
    ClientsDataStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      clients: ClientsDataStore.getLonelyClients()
    })
  }

  render() {
    let { clients } = this.state
    let Clients= '';

    if(clients){
      clients = clients.filter(x=>x.petId === null)
      Clients = clients.map( client => {
        let {name , id , gender, image, info, animalName, age, details } = client ;

        return (
          <Card key ={id}>
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
              <Button color='orange'>Adopt Animal</Button>
              <Button color='green'>Update Info</Button>
              <Button color='red'>Delete</Button>
            </Card.Content>
          </Card>
        )
      })
    }

    return (
      <Grid textAlign='center'>
        <Grid.Row columns={5}>
          {Clients}
        </Grid.Row>
      </Grid>
    )
  }
}
