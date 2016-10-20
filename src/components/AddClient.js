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
  constructor(props){
    super(props)
    this.state = {mssg:false}
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleSubmit(e, serializedForm){
    e.preventDefault()
    serializedForm.age = parseInt(serializedForm.age)
    if(serializedForm.petId == ''){
      serializedForm.petId = null
    }else{
      serializedForm.petId = parseInt(serializedForm.petId)
    }
    this.setState({
      mssg:true
    })
    ClientsDataActions.addClient(serializedForm)
  }

  render () {
    let {mssg} = this.state
    let Mssg = mssg ? (<Message positive floating><Message.Header>Client Added</Message.Header>
    <p>Please check out the Looking for Pets page for more info!</p></Message>) : (<Message floating><h3>Client</h3> </Message>)
    return (
      <Form onSubmit={this.handleSubmit}>
        {Mssg}
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
