import React from 'react'
import { render } from 'react-dom'
import { Router,Route,Link,browserHistory} from 'react-router'
const Login = require('./Login');
const Register = require('./register/register.js');

render((
    <Router history={browserHistory}>
        <Route path="/" component={Login}>
        </Route>
        <Route path="register" component={Register} />
        
    </Router>
), document.getElementById('contain'));