import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App, {SendAirport} from '../js/airport_pickup/index'

render((
    <Router history={hashHistory}>
        <Route path='/' component={App} />
    </Router>
), document.getElementById('root'))
