import { render } from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { Router,Route, hashHistory,Link} from 'react-router'
import '../../less/media/index'
import '../../less/index/swiper-3.3.1.min'
import Swiper from '../util/swiper'

//let CLAudioPlayer = require('react-cl-audio-player');

class MediaHeader extends Component {
    constructor(args) {
        super(args);
        this.state = {

        }
        
    }

    componentDidMount(){
        var that = this;
        let mediaItem = this.refs.media_Item;
        var mediaItems = document.getElementsByName('mediaItems');
        mediaItem.onclick = function(ev){
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            if(target.nodeName.toLowerCase() == "li" || target.nodeName.toLowerCase() == "div" || target.nodeName.toLowerCase() == "a"){
                switch(Number(target.getAttribute('data-id'))){
                    case 1:
                        that.refs.yingyin.className = 'video-yingyin';
                        that.refs.yinyue.className = 'video-yinyue';
                        that.refs.donghua.className = 'video-donghua';
                        that.refs.hot.className = 'video-hot hot-choice';
                        that.refs.icon_hot_choice.className = 'icon_con_choice icon_con';
                        that.refs.icon_ying_choice.className = ' icon_con';
                        that.refs.icon_yin_choice.className = ' icon_con';
                        that.refs.icon_dong_choice.className = ' icon_con';
                        break;
                    case 2:
                        that.refs.yinyue.className = 'video-yinyue';
                        that.refs.donghua.className = 'video-donghua';
                        that.refs.hot.className = 'video-hot';
                        that.refs.yingyin.className = 'video-yingyin yingyin-choice';
                        that.refs.icon_ying_choice.className = 'icon_con_choice icon_con';
                        that.refs.icon_hot_choice.className = 'icon_con';
                        that.refs.icon_yin_choice.className = ' icon_con';
                        that.refs.icon_dong_choice.className = ' icon_con';
                        break;
                    case 3:
                        that.refs.donghua.className = 'video-donghua';
                        that.refs.hot.className = 'video-hot';
                        that.refs.yingyin.className = 'video-yingyin';
                        that.refs.yinyue.className = 'video-yinyue yinyue-choice';
                        that.refs.icon_yin_choice.className = 'icon_con_choice icon_con';
                        that.refs.icon_hot_choice.className = 'icon_con';
                        that.refs.icon_ying_choice.className = ' icon_con';
                        that.refs.icon_dong_choice.className = ' icon_con';
                        break;
                    case 4:
                        that.refs.hot.className = 'video-hot';
                        that.refs.yingyin.className = 'video-yingyin';
                        that.refs.yinyue.className = 'video-yinyue';
                        that.refs.donghua.className = 'video-donghua donghua-choice';
                        that.refs.icon_dong_choice.className = 'icon_con_choice icon_con';
                        that.refs.icon_hot_choice.className = 'icon_con';
                        that.refs.icon_ying_choice.className = ' icon_con';
                        that.refs.icon_yin_choice.className = ' icon_con';
                        break;
                    default:
                        break;
                }
            }
        }
    }
    render(){
        return (
            <div className='media-header'>
                <div className="media-header-left">
                    <img src='../image/backicon.png' />
                    <img src="../image/yingyin.png" />
                    <span>影音视频</span>
                </div>
                <div className="media-header-right" ref="media_Item">
                    <ul className="media-kind-list">
                        <li  data-id="1">
                            <Link to="/hotplay" data-id="1">
                                <div className="video-hot hot-choice" data-id="1" ref="hot"></div>
                                <div name="mediaItems" ref="icon_hot_choice" className="icon_con_choice icon_con" data-id="1">热播</div>
                            </Link>
                        </li>
                        <li data-id="2">
                            <Link to="/kmplayer" data-id="2">
                                <div className="video-yingyin" data-id="2" ref="yingyin"></div>
                                <div name="mediaItems" ref="icon_ying_choice" className="icon_con" data-id="2">影音</div>
                            </Link>
                        </li>
                        <li data-id="3">
                            <Link to="/musicplay" data-id="3">
                                <div className="video-yinyue" data-id="3" ref="yinyue"></div>
                                <div name="mediaItems" ref="icon_yin_choice" className="icon_con" data-id="3">音乐电台</div>
                            </Link>
                        </li>
                        <li data-id="4">
                            <Link to="/cartoon" data-id="4">
                                <div className="video-donghua" data-id="4" ref="donghua"></div>
                                <div name="mediaItems" ref="icon_dong_choice" className="icon_con" data-id="4">动画片</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default class MainMedia extends Component {
    constructor(args) {
        super(args)
    }
    render() {
        return (
            <div>
                <MediaHeader />
                {this.props.children}
            </div>
        )
    }
}