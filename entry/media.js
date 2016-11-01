import React from 'react';
import { render } from 'react-dom';
import { Router,Route, hashHistory,browserHistory} from 'react-router';
import MainMedia from '../js/media/mainMedia';
import HotPlay from "../js/media/hotPlay";
import Kmplayer from '../js/media/kmplayer';
import MusicPlay from '../js/media/musicplayer';
import Cartoon from '../js/media/cartoon';
import Play from '../js/media/play';

render((
    <Router history={ hashHistory }>
        <Route path="/" component={ MainMedia }>
            <Route path="hotplay" component={ HotPlay } />
            <Route path="kmplayer" component={ Kmplayer } />
            <Route path="musicplay" component={ MusicPlay } />
            <Route path="cartoon" component={ Cartoon } />
        </Route>
        <Route path="/play/:id" component={ Play } />
    </Router>
), document.getElementById('media'))