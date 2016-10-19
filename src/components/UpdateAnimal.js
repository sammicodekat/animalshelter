import React, { Component } from 'react'
import {  Button, Checkbox, Form, Input, Radio, Select, TextArea,Message  } from 'semantic-ui-react'
import ClientsDataActions from "../actions/ClientsDataActions"


export default class AddAnimal extends Component {
  constructor(props){
    super(props)
  }

  handleSubmit(e,serializedForm){
    e.preventDefault()
    let {id} = this.props;
    ClientsDataActions.updateAnimal(serializedForm,id)
  }

  render () {
    let {animals,id} = this.props
    let animal = animals.filter( x => x.id == id)
   let {name , breed , gender, image, size, characters, clientName, age, details } = animal[0]
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Message>
       <h3>{name}</h3>
     </Message>
        <Form.Group widths='equal'>
          <Form.Input label='Name' name='name' defaultValue={name} />
          <Form.Input label='Age' name='age' defaultValue={age} />
          <Form.Input label='Gender' name='gender' defaultValue={gender} />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input label='Breed' name='breed' defaultValue={breed} />
          <Form.Input label='Characters' name='characters' defaultValue={characters} />
        </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input label='Size' name='size' defaultValue={size} />
            <Form.Input label='Client Id' name='clientId' placeholder='Client Id' />
          </Form.Group>
          <Form.Input label='Image Link' name='image' defaultValue={image} />
        <Form.TextArea name='details' label='Details'defaultValue={details} rows='3' />
        <Button primary type='submit'>Update</Button>
      </Form>
    )
  }
}
