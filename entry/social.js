import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Redirect, browserHistory, hashHistory } from 'react-router'

import App, { Weibo } from '../js/social/index'


render((
    <Router history={hashHistory}>
        <Route path="/" component={App} >
            <Route path="weibo" component={Weibo} />
        </Route>
    </Router>
), document.getElementById('root'));