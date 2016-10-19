import React from 'react'
import { render } from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import Layout from './components/Layout'
import Home from './components/Home'
import AnimalList from './components/AnimalList'
import LonelyAnimal from './components/LonelyAnimal'
import ClientList from './components/ClientList'
import LonelyClient from './components/LonelyClient'

render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="/animals" component={AnimalList} />
      <Route path="/clients" component={ClientList} />
      <Route path="/lanimals" component={LonelyAnimal} />
      <Route path="/lclients" component={LonelyClient} />
    </Route>
  </Router>,
  document.getElementById('root')
)
