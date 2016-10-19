import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { List,Item, Image, Label, Icon, Card,Grid,Button } from 'semantic-ui-react'

import ClientsDataStore from '../stores/ClientsDataStore'
import ClientsDataActions from '../actions/ClientsDataActions'

export default class AnimalList extends Component {
  constructor() {
    super();
    this.state={
      animals: ClientsDataStore.getAnimals()
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    ClientsDataStore.startListening(this._onChange)
    ClientsDataActions.getAnimals()
  }

  componentWillUnmount () {
    ClientsDataStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      animals: ClientsDataStore.getAnimals()
    })
  }


  render() {
    let { animals } = this.state
    console.log("animals",animals)
    let Animals = '';

    if(animals){
      Animals = animals.map( animal => {
        let {name , id , breed , gender, image, size, characters, clientName, age, details } = animal ;

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
                Breed: {breed}
              </Card.Meta>
              <Card.Meta>
                Characters: {characters}
              </Card.Meta>
              <Card.Meta>
                Size: {size}
              </Card.Meta>
              <Card.Meta>
                Owner: {clientName} <Button size='mini' color='red'>Unadopt</Button>
              </Card.Meta>
              <Card.Description>
                {details}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button color='green'>Update Info</Button>
            </Card.Content>
          </Card>
        )
      })
    }
    return (
      <Grid textAlign='center'>
        <Grid.Row columns={5}>
          {Animals}
        </Grid.Row>
      </Grid>
    )
  }
}
