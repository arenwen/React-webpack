import React from 'react'
import { render } from 'react-dom'
import { Router,Route,Link,browserHistory} from 'react-router'

import Stock from '../js/stock/stocks'


render((
    <Stock />
), document.getElementById('root'));
