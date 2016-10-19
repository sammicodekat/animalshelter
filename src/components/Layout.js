import React, { Component } from 'react'
import {Link} from 'react-router'
import classNames from 'classnames'
import { Menu } from 'semantic-ui-react'

export default class Layout extends Component {
  render () {
    let path = this.props.location.pathname

    return (
      <div>
        <Menu inverted color='orange' className="menu" stackable>
          <Menu.Item>
            <img src='./icon.png'/>
          </Menu.Item>
          <Menu.Item>
            <h1>Animal Shelter DB</h1>
          </Menu.Item>
          <Menu.Item className={classNames({active: path === '/'})}><Link to="/">Home</Link></Menu.Item>
          <Menu.Item className={classNames({active: path === '/animals'})}><Link to="/animals">Adopted Animals</Link></Menu.Item>
          <Menu.Item className={classNames({active: path === '/clients'})}><Link to="/clients">Clients with Pets</Link></Menu.Item>
          <Menu.Item className={classNames({active: path === '/lanimals'})}><Link to="/lanimals">Available for Adoption</Link></Menu.Item>
          <Menu.Item className={classNames({active: path === '/lclients'})}><Link to="/lclients">Looking for Pets</Link></Menu.Item>
        </Menu>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}
