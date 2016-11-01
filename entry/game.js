import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import App, { Game } from '../js/game/index'


render((
    <Router history={hashHistory}>
        <Route path="/" component={App} >
            <Route path=":gid" component={Game} />
            <Route path="focus/:fgid" component={Game} />
        </Route>
    </Router>
), document.getElementById('root'))
