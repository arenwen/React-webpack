import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
var Img = require('../../image/navigation_logo.png');
export default class NavigationBar extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    getClientHeight(){
        let clientHeight = 0;
        if(document.body.clientHeight && document.documentElement.clientHeight){
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight:document.documentElement.clientHeight;
        }else{
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight:document.documentElement.clientHeight;
        }
        return clientHeight;
    }
    componentDidMount(){
        var that =this;
        let top_navigation = this.refs.topNavigation;
        var allNavigation = document.getElementsByName('topNavigation-Item');
        top_navigation.onclick = function(ev){
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            if(target.nodeName.toLowerCase() == "li"){
                for(let i=0;i<allNavigation.length;i++){
                    allNavigation[i].className = '';
                }
                target.className = 'activity_focus';
                switch(Number(target.getAttribute('data-id'))){
                    case 1:
                        window.location.href = '../index.html';
                        break;
                    case 2:
                        window.location.href = '/html/news.html';
                        break;
                    case 3:
                        window.location.href = '/html/destination.html';
                        break;
                    case 4:
                        window.location.href = '/html/social.html';
                        break;
                    case 5:

                        break;
                    case 6:
                        window.location.href = '/html/media.html#/hotplay';
                        break;
                    case 7:
                        window.location.href = '/html/stocks.html';
                        break;
                    case 8:
                        window.location.href = '/html/airport_pickup.html';
                        break;
                    case 9:
                        window.location.href = '/html/game.html';
                        break;
                    case 10:
                        window.location.href = '/html/eyesonworld.html';
                        break;
                    case 11:
                        window.location.href = '/html/about.html';
                        break;
                    default:
                        break;

                }
            }
        }
        window.onscroll = function (){
            if(document.body.scrollTop > (that.getClientHeight()/2+200)){
                that.setState({
                    ifFixed:true
                });
            }else{
                that.setState({
                    ifFixed:false
                });
            }

            if (that.props.srollCallback != undefined) {
                that.props.srollCallback()
            }
        }
    }

    render(){
        return (
            <div className={this.state.ifFixed == true ? 'navigation-bar':'navigation-bar dn'}>
                <div className="navigation-left-logo">
                    <img src={Img} />
                </div>
                <ul className="navigation-right" ref="topNavigation">
                    <li className="activity_focus" name="topNavigation-Item" data-id='1'>首页</li>
                    <li name="topNavigation-Item" data-id='2'>资讯头条</li>
                    <li name="topNavigation-Item" data-id='3'>目的地</li>
                    <li name="topNavigation-Item" data-id='4'>社交</li>
                    <li name="topNavigation-Item" data-id='5'>空中电商</li>
                    <li name="topNavigation-Item" data-id='6'>影音娱乐</li>
                    <li name="topNavigation-Item" data-id='7'>股票行情</li>
                    <li name="topNavigation-Item" data-id='8'>接送机</li>
                    <li name="topNavigation-Item" data-id='9'>游戏</li>
                    <li name="topNavigation-Item" data-id='10'>深航女孩</li>
                    <li name="topNavigation-Item" data-id='11'>关于深航</li>
                </ul>
            </div>
        )
    }
}
