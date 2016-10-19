import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { List,Item, Image, Label, Icon, Card,Grid,Button,Modal} from 'semantic-ui-react'
import ClientsDataStore from '../stores/ClientsDataStore'
import ClientsDataActions from '../actions/ClientsDataActions'
import AddAnimal from './AddAnimal'

export default class LonelyAnimal extends Component {
  constructor() {
    super();
    this.state={
      animals: ClientsDataStore.getLonelyAnimals(),
      open:false
    }
    this._onChange = this._onChange.bind(this);
    this.show=this.show.bind(this)
    this.close=this.close.bind(this)
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

    show(){
      this.setState({
        open: true
      })
    }

    close(){
      this.setState({
        open: false
      })
    }

  render() {
    let { animals,open } = this.state
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
              <Button color='green' onClick={this.show}>Update Info</Button>
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
        <Modal dimmer='blurring' open={open} onClose={this.close}>
          <Modal.Header>Edit</Modal.Header>
          <Modal.Content>
          <AddAnimal/>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Cancel
            </Button>
            <Button positive icon labelPosition='right' onClick={this.close}>
              Save<Icon name='checkmark' />
          </Button>
        </Modal.Actions>
      </Modal>
      </Grid>
    )
  }
}
