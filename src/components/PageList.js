import React, { Component } from 'react'
import { pages } from '../api'
import { Link } from 'react-router-dom'

export default class PageList extends Component {

  state = {
    loaded: false,
    pageTitle: "",
    pl: []
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => e.key == 'Enter' &&
    pages.push({ title: this.state.pageTitle }) &&
    this.setState({ pageTitle: "" })

  componentDidMount = () => {
    pages.on('value', ss => {
      this.setState({
        pl: ss.val(),
        loaded: true
      })
    })
  }

  renderPage = p => (
    <li key={p}>
      <Link to={`/page/${p}`}>{this.state.pl[p].title}</Link>
    </li>
  )


  render = () => {
    window.pages = pages
    const { user } = this.props

    return (
      <div>
        {user && <input type="text" value={this.state.pageTitle} id="pageTitle" className="u-full-width"
          placeholder="page title" onChange={this.handleChange} onKeyPress={this.handleSubmit} />}
        {this.state.loaded && <ul>{Object.keys(this.state.pl).map(this.renderPage)}</ul>
          || <p> loading ... </p>}
      </div>
    )
  }
}