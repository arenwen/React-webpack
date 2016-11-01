import React from 'react'
import { render } from 'react-dom'
import { Router,Route, hashHistory} from 'react-router'
import Eyesonworld from '../js/eyesonworld/Eyesonworld'
import EyesDetail from '../js/eyesonworld/detail/EyesDetail'


render((
    <Router history={hashHistory}>
        <Route path="/" component={Eyesonworld}>
            <Route path="/" component={Eyesonworld} />
            <Route path="/eyesdetail/:cid" component={EyesDetail} />
        </Route>
    </Router>
), document.getElementById('eyesonworld'))
