import React, { Component } from 'react'
import {  Button, Checkbox, Form, Input, Radio, Select, TextArea,Message  } from 'semantic-ui-react'
import ClientsDataActions from "../actions/ClientsDataActions"

const genders = [
  { text: 'Boy', value: 'boy' },
  { text: 'Girl', value: 'girl' },
]
const size = [
  { text: 'Small', value: 'small' },
  { text: 'Medium', value: 'medium' },
  { text: 'Large', value: 'large' },
]

const characters = [
  { text: 'Smart', value: 'smart' },
  { text: 'Easy To Train', value: 'trainable' },
  { text: 'Easy To Groom', value: 'groom' },
  { text: 'Friendly Towards Strangers', value: 'friendly' },
  { text: 'Affectionate with Family', value: 'affectionate' },
  { text: 'Energetic', value: 'energetic' },
  { text: 'Quiet', value: 'quiet' },
  { text: 'Kid Friendly', value: 'kid-friendly' },
  { text: 'Drool-prone', value: 'drools' },
  { text: 'Healthy', value: 'healthy' },
]

export default class AddAnimal extends Component {

  handleSubmit(e, serializedForm){
    e.preventDefault()
    serializedForm.age = parseInt(serializedForm.age)
    if(serializedForm.clientId == ''){
      serializedForm.clientId = null
    }else{
      serializedForm.clientId = parseInt(serializedForm.clientId)
    }
    ClientsDataActions.addAnimal(serializedForm)
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Message>
       <h3> Animal</h3>
     </Message>
        <Form.Group widths='equal'>
          <Form.Input label='Name' name='name' placeholder='Name' />
          <Form.Input label='Age' name='age' placeholder='Age' />
          <Form.Select label='Gender' name='gender' options={genders} placeholder='Gender' />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input label='Breed' name='breed' placeholder='Breed' />
        <Form.Select label='Animal Characters' name='characters' options={characters} placeholder='Search...'/>
        </Form.Group>
          <Form.Group widths='equal'>
          <Form.Select label='Size' name='size' options={size} placeholder='Gender' />
            <Form.Input label='Client Id' name='clientId' placeholder='Client Id' />
          </Form.Group>
          <Form.Input label='Image Link' name='image' placeholder='image url' />
        <Form.TextArea name='details' label='Details' placeholder='Anything else ?' rows='3' />
        <Button primary type='submit'>Add Animal</Button>
      </Form>
    )
  }
}
