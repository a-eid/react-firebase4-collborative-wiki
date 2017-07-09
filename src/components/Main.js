import React, { Component } from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

import Page from './Page'
import Login from './Login'
import PageList from './PageList'

import { pages } from '../api'

export default class Main extends Component {

  state = {
    user: USER
  }

  setUser = (des, data) => {
    if (des == "out") {
      return this.setState({ user: null })
    }

    if (des == "in") {
      if (!data.signedIn) return
      return this.setState({ user: data.user })
    }

    if (des == "up") {
      if (!data.signedIn) return
      return this.setState({ user: data.user })
    }
  }

  render = () => (
    <div className="row">
      <div className="three columns">
        <h1>Wicker</h1>
        <Login user={this.state.user} setUser={this.setUser} />
        <PageList user={this.state.user}  />
      </div>
      <div className="nine columns">
        <Switch>
          <Route exact path="/" render={() => <h2> Home </h2>} />
          <Route path="/page/:id" render={ ({match}) => <Page id={match.params.id} user={this.state.user} />} />
        </Switch>
      </div>
    </div>
  )
}


