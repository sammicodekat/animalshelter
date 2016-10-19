import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { List,Item, Image, Label, Icon, Card,Grid,Button } from 'semantic-ui-react'
import ClientsDataStore from '../stores/ClientsDataStore'
import ClientsDataActions from '../actions/ClientsDataActions'

export default class LonelyAnimal extends Component {
  constructor() {
    super();
    this.state={
      animals: ClientsDataStore.getLonelyAnimals()
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    ClientsDataStore.startListening(this._onChange)
    ClientsDataActions.getLonelyAnimals()
  }

  componentWillUnmount () {
    ClientsDataStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      animals: ClientsDataStore.getLonelyAnimals()
    })
  }


  render() {
    let { animals } = this.state
    let Animals = '';

    if(animals){
      animals=animals.filter(x => x.clientId === null)
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
              <Card.Description>
                {details}
              </Card.Description>
            </Card.Content>
            <Card.Content extra >
              <Button color='orange'>Adopt</Button>
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
          {Animals}
        </Grid.Row>
      </Grid>
    )
  }
}
