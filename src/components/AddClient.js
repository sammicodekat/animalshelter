import React, { Component } from 'react'
import {  Button, Checkbox, Form, Input, Radio, Select, TextArea, Message  } from 'semantic-ui-react'
import ClientsDataActions from "../actions/ClientsDataActions"

const genders = [
  { text: 'Male', value: 'male' },
  { text: 'Female', value: 'femal' },
]
const info = [
  { text: 'Novice Owner', value: 'novice' },
  { text: 'Experiened Owner', value: 'experienced' },
  { text: 'Has Kids', value: 'kids' },
]

export default class AddClient extends Component {

  handleSubmit(e, serializedForm){
    e.preventDefault()
    ClientsDataActions.addClient(serializedForm)
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Message>
       <h3> Client </h3>
     </Message>
        <Form.Group widths='equal'>
          <Form.Input label='Name' name='name' placeholder='Name' />
          <Form.Input label='Age' name='age' placeholder='Age' />
          <Form.Select label='Gender' name='gender' options={genders} placeholder='Gender' />
        </Form.Group>
          <Form.Group widths='equal'>
          <Form.Select label='Client Info' name='info' options={info} placeholder='Client Info' />
          <Form.Input label='Pet Id' name='petId' placeholder='Pet id' />
          </Form.Group>
          <Form.Input label='Image Link' name='image' placeholder='image url' />
        <Form.TextArea name='details' label='Details' placeholder='Anything else ?' rows='3' />
        <Button primary type='submit'>Add Client</Button>
      </Form>
    )
  }
}
