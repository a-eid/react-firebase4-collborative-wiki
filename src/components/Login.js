import React, { Component } from 'react'
import * as API from '../api'

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  }

  loggedIn = ({username}) => (
    <div className="row">
      <p>hi {username}</p>
      <p>
        <button onClick={this.signOut}>sign out</button>
      </p>
    </div>
  )
  
  loggedOut = () => (
    <div className="row">
      <input type="text" className="u-full-width" placeholder="user name"
        value={this.state.username} id="username" onChange={this.updateText} />
      <input type="password" className="u-full-width" placeholder="password"
        value={this.state.password} id="password" onChange={this.updateText} />
      <input type="submit" value="sign in" onClick={this.signIn} />
      <input type="submit" value="sign up" onClick={this.signUp} />
    </div>
  )

  updateText = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  // signIn = () => API.signIn(this.state.username , this.state.password).then(() => this.props.setUser(data.user))
  // signUP = () => API.signUp(this.state.username , this.state.password).then(() => this.props.setUser(data.user))
  // signOut = () => API.signOut().then(() => this.props.setState(null))

  signIn = () => 
    API.signIn(this.state.username, this.state.password).then(data => this.props.setUser("in", data))
  signUp = () => 
    API.signUp(this.state.username, this.state.password).then(data => this.props.setUser("up", data))
  
  signOut = () => 
    API.signUp().then(data => this.props.setUser("out"))

  render = () => {
    const username = this.props.user
    return (
      <div>
        <h2>Login</h2>
        {username && this.loggedIn(username) || this.loggedOut()}
      </div>
    )
  }
}