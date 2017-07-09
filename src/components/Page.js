import React, { Component } from 'react'
import { pages } from '../api'
import Section from './Section'

export default class Page extends Component {
  state = {
    page: {}
  }

  componentDidMount = () => {
    pages.child(this.props.id).on('value', this.listener)
  }
  listener = ss =>
    this.setState({
      page: ss.val(),
      sections: ss.val().sections
    })

  componentWillReceiveProps = np => {
    pages.child(this.props.id).off('value', this.listener)
    pages.child(np.id).on('value', this.listener)
  }

  addSection = () => {
    let id
    if (Object.keys(this.state.sections || {}).length < 1) {
      id = 1 // no sections set id to 1 or 0 doesn't matter 
      this.state.sections = {}
    } else {
      id = Math.max(...Object.keys(this.state.sections)) + 1 // else max + 1 
    }

    // by default who added the section is the editor of it 
    this.state.sections[id] = {
      editor: this.props.user.username
    }
    this.setState({
      sections: this.state.sections
    })
  }


  render = () => {
    let { id: pageId } = this.props // if of the page 
    let sections = []
    if (this.state.page.title) {
      if (this.state.sections)
        sections = Object.keys(this.state.sections)
          .map(id => <Section key={id} id={id} user={this.props.user}
            section={this.state.sections[id]} pageId={pageId} />)
      if (this.props.user) {
        sections.push(<p key="addSection">
          <button onClick={this.addSection}>Add Section</button>
        </p>)
      }
    }

    return (
      <article>
        <h1>{this.state.page.title || "Loading..."}</h1>
        {sections}
      </article >
    )
  }
}
