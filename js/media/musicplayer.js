import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';
import { Router,Route, hashHistory,Link} from 'react-router';
import '../../less/media/musicplay';
let CLAudioPlayer = require('react-cl-audio-player');
class Player extends Component {
    constructor(args) {
        super(args)
        this.state = {
            songs:[
                {
                    url: '../image/music.mp3',
                    cover: '../image/test5.jpg',
                    artist: {
                        name: 'Redfoo',
                        song: '--New Thang',
                        fromsource:'/来源：考拉电台',
                        currentTime:'00',
                        allTime:'00'
                    }
                }
            ]
        }
    }
    render() {
        return (
            <CLAudioPlayer songs={this.state.songs} />
        )
    }
}
class Radio extends Component {
    constructor(args) {
        super(args)
    }
    render(){
        return (
            <div className="radio-content">
                <div className="radio-title">
                    <img src="../image/kaolasmall.png" />
                    <img src="../image/dashedcut.png" />
                </div>
                <ul className="radio-content-list">
                    <li>
                        <div>
                            <img src="../image/Ticket1.png" />
                            <img src="../image/test5.jpg" className="author-header"/>
                        </div>
                        <p className="radio-list-name">北京欢乐时光</p>
                        <p className="radio-list-author">当前主播：刘德华</p>
                    </li>
                    <li>
                        <div>
                            <img src="../image/Ticket2.png" />
                            <img src="../image/test5.jpg" className="author-header"/>
                        </div>
                        <p className="radio-list-name">北京欢乐时光</p>
                        <p className="radio-list-author">当前主播：刘德华</p>
                    </li>
                    <li>
                        <div>
                            <img src="../image/Ticket3.png" />
                            <img src="../image/test5.jpg" className="author-header"/>
                        </div>
                        <p className="radio-list-name">北京欢乐时光</p>
                        <p className="radio-list-author">当前主播：刘德华</p>
                    </li>
                    <li>
                        <div>
                            <img src="../image/Ticket4.png" />
                            <img src="../image/test5.jpg" className="author-header"/>
                        </div>
                        <p className="radio-list-name">北京欢乐时光</p>
                        <p className="radio-list-author">当前主播：刘德华</p>
                    </li>
                    <li>
                        <div>
                            <img src="../image/Ticket5.png" />
                            <img src="../image/test5.jpg" className="author-header"/>
                        </div>
                        <p className="radio-list-name">北京欢乐时光</p>
                        <p className="radio-list-author">当前主播：刘德华</p>
                    </li>
                    <li>
                        <div>
                            <img src="../image/Ticket6.png" />
                            <img src="../image/test5.jpg" className="author-header"/>
                        </div>
                        <p className="radio-list-name">北京欢乐时光</p>
                        <p className="radio-list-author">当前主播：刘德华</p>
                    </li>
                </ul>
            </div>
        )
    }
}
export default class MusicPlay extends Component {
    render(){
        return (
            <div className="musicplayer">
                <div className="music-header">
                    <div className="music-animation">
                        <img src="../image/musicJiaoPianTou.png" className="tou_ying"/>
                        <img src="../image/musicJiaoPian.png" className="jiaopian"/>
                        <img src="../image/musicSunLine.png" className="sun-line" />
                        <img src="../image/musicTiaoZhen.png" className="tiao-zhen" />
                        <div className="current-music">

                        </div>
                        <div className="player-content">
                            <p>幸福别来无恙&nbsp;&nbsp;第89期</p>
                            <p>当前主播：刘德华</p>
                        </div>
                    </div>
                </div>
                <Radio />
                <Player />
            </div>
        )
    }
}
