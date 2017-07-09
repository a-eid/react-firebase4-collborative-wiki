import React, { Component } from 'react'
import { markdown } from 'markdown'
import { pages } from '../api'
import { Redirect, history } from 'react-router-dom'


export default class Sections extends Component {
  constructor(props) {
    super(props)
    console.log()
    this.state = this.getState(props)
  }

  getState = ({ section, user }) => ({
    // redirect hack 
    redirect: undefined,
    // locked if someone (other than this user) is editing it
    locked: user && section.editor && section.editor != user.username,
    // if this user is editing ( notice there might be multiple users looking at this section )
    editing: user && section.editor == user.username,
    content: section.content,
    html: section.content && markdown.toHTML(section.content) || ""
  })

  startEditing = e => {
    let href = e.target.getAttribute('href')
    if (e.target.tagName.toLowerCase() === 'a') {
      if (href.indexOf('/page/') >= 0) {
        this.setState({
          redirect: href
        })
      }
      return e.preventDefault()
    }
    if (!this.props.user || this.state.locked) return
    const { pageId, id } = this.props
    this.setState({
      editing: true
    })
    pages.child(`${pageId}/sections/${id}`).update({
      editor: this.props.user.username
    })
  }

  doneEditing = e => {
    const { pageId, id } = this.props
    if (!this.state.editing) return
    pages.child(`${pageId}/sections/${id}`).update({
      content: this.textarea.value.trim().length > 1 && this.textarea.value || null,
      editor: null
    })
  }

  componentWillReceiveProps = props => {
    this.setState(this.getState(props))
  }

  render = () => {

    // redirect hack 
    if (this.state.redirect) return <Redirect push to={this.state.redirect} />

    let html
    if (this.state.editing) {
      html = <textarea className="twelve columns" autoFocus={true} ref={textarea => this.textarea = textarea}
        defaultValue={this.state.content} />
    } else {
      html = <div
        dangerouslySetInnerHTML={{ __html: this.state.html }} />
    }

    let classes = ["row", "section"]
    if (this.state.editing) classes.push("editing")
    if (this.props.user) classes.push(this.state.locked ? "locked" : "editable")

    return (
      <section onClick={this.startEditing} onBlur={this.doneEditing} className={classes.join(" ")} >
        {html}
      </section>
    )
  }

}