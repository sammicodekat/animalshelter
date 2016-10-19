import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
const { Column, Row } = Grid
import AddAnimal from './AddAnimal'
import AddClient from './AddClient'
import AnimalList from './AnimalList'
import ClientList from './ClientList'


export default class Home extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Grid centered  textAlign='center' padded>
        <Row columns={2}>
          <Column textAlign='center'><AddAnimal/></Column>
          <Column textAlign='center'><AddClient/></Column>
        </Row>
      </Grid>
    )
  }
}
