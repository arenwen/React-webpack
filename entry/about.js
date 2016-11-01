import React from 'react'
import { render } from 'react-dom'
import { Router,Route, hashHistory} from 'react-router'
import About from '../js/about/About'
import Products from '../js/about/Products'


render((
    <Router history={hashHistory}>
      <Route path="/" component={About}>
          <Route path="/" component={About} />
          <Route path="/about/:pid" component={Products} />
      </Route>
    </Router>
), document.getElementById('about'))
