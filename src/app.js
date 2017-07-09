import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

// import components 
import Main from './components/Main'



const routes = (
  <Router>
    <div className="container">
      <Main />
    </div>
  </Router>
)
render(routes, document.querySelector('#app'))
