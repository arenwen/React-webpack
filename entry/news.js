import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRedirect, Redirect, browserHistory, hashHistory} from 'react-router'

import { App, NewsList, DetailIndex } from '../js/news/index'


render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to='category/15' />
            <Route path="category/:cid" component={NewsList} />
            <Route path="detail/:nid" component={DetailIndex} />
        </Route>
    </Router>
), document.getElementById('root'))
