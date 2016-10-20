import React, { Component } from 'react'
import {  Button, Checkbox, Form, Input, Radio, Select, TextArea,Message  } from 'semantic-ui-react'
import ClientsDataActions from "../actions/ClientsDataActions"


export default class UpdateAnimal extends Component {
  constructor(props){
    super(props)
    this.state = {mssg:false}
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleSubmit(e,serializedForm){
    e.preventDefault()
    let {id} = this.props;
    serializedForm.age = parseInt(serializedForm.age)
    ClientsDataActions.updateAnimal(serializedForm,id)
    this.setState({
      mssg:true
    })
  }

  render () {
    let {mssg} = this.state
    let {animals,id} = this.props
    let animal = animals.filter( x => x.id == id)
   let {name , breed , gender, image, size, characters, clientName, age, details } = animal[0]
    let Mssg = mssg ? (<Message positive floating><Message.Header>Profile Updated</Message.Header>
    <p>Please click go back and check the updated profile!</p></Message>) : (<Message floating><h3>Please update {name}'s profile</h3> </Message>)

    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
         {Mssg}
        <Form.Group widths='equal'>
          <Form.Input label='Name' name='name' defaultValue={name} />
          <Form.Input label='Age' name='age' type='number' defaultValue={age} />
          <Form.Input label='Gender' name='gender' defaultValue={gender} />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input label='Breed' name='breed' defaultValue={breed} />
          <Form.Input label='Characters' name='characters' defaultValue={characters} />
        </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input label='Size' name='size' defaultValue={size} />
            <Form.Input label='Image Link' name='image' defaultValue={image} />
          </Form.Group>
        <Form.TextArea name='details' label='Details' defaultValue={details} rows='3' />
        <Button primary type='submit'>Update</Button>
      </Form>
    )
  }
}
