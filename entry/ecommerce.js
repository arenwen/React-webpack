import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Redirect, browserHistory, hashHistory } from 'react-router'

import App from '../js/ecommerce/index'


render((
    <Router history={hashHistory}>
        <Route path="/" component={App} >
        </Route>
    </Router>
), document.getElementById('root'))
