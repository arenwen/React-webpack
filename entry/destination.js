import React from 'react'
import { render } from 'react-dom'
import { Router,Route, hashHistory} from 'react-router'
import Destination from '../js/destination/Destination'
import CityContainer from '../js/destination/city/CityContainer'
import AtlasContainer from '../js/destination/atlas/AtlasContainer'
import StrategyContainer from '../js/destination/strategy/StrategyContainer'

render((
    <Router history={hashHistory}>
      <Route path="/" component={Destination}>
         <Route path="/city/:cid" component={CityContainer}>
            <Route path="tab/:tid" component={CityContainer} />
            <Route path="atlas/:aid" component={AtlasContainer} />
            <Route path="strategy/:sid" component={StrategyContainer} />
        </Route>
      </Route>
    </Router>
), document.getElementById('destination'))
