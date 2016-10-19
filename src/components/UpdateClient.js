import React, { Component } from 'react'
import {  Button, Checkbox, Form, Input, Radio, Selelocalct, TextArea,Message  } from 'semantic-ui-react'
import ClientsDataActions from "../actions/ClientsDataActions"


export default class UpdateClient extends Component {
  constructor(props){
    super(props)
  }

  handleSubmit(e,serializedForm){
    e.preventDefault()
    let {id} = this.props;
    serializedForm.age = parseInt(serializedForm.age)
    ClientsDataActions.updateClient(serializedForm,id)
  }

  render () {
    let {clients,id} = this.props
    let client = clients.filter( x => x.id == id)
   let {name ,gender, image, info, age, details } = client[0] ;
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
          <Form.Input label='Info' name='info' defaultValue={info} />
          <Form.Input label='Image Link' name='image' defaultValue={image} />
        </Form.Group>
        <Form.TextArea name='details' label='Details' defaultValue={details} rows='3' />
        <Button primary type='submit'>Update</Button>
      </Form>
    )
  }
}
