 import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import '../../less/index/swiper-3.3.1.min'
import '../../less/index/index'
import config from '../../commonConfig'
import fetch from "isomorphic-fetch"
import Loading from '../util/loading'
import NavigationBar from '../util/navigationBar'
import Swiper from '../util/swiper'

let WEEK_INFO = [
    '一','二','三','四','五','六','日'
]

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    formatSeconds (date,format) {
        if (Object.prototype.toString.call(date) !== "[object Date]") {
            date = new Date(date);
        }
        var map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                  v = '0' + v;
                  v = v.substr(v.length - 2);
                }
                return v;
            } else if (t === 'y') {
                return (date.getFullYear() + '').substr(2 - all.length);
            }
            return all;
        });
        return format;
    }

    render(){
        // let shiji = '"'+this.props.headerdatas.atd+'"';
        // let starttime = shiji.replace(new RegExp("-","gm"),"/");
        // console.log(starttime);
        // let starttimeHaoMiao = (new Date(starttime)).getTime();
        // console.log(starttimeHaoMiao);
        let weekIndex =this.props.weatherInfo.week-1
        let weekInfo = WEEK_INFO[weekIndex]
        let hostUrl = config.FETCH_URL.slice(0,-1)
        let imgUrl = hostUrl + this.props.weatherInfo.img
        let nowDate = new Date()
        let todayDate = this.formatSeconds(nowDate,"M月d日")
        return (
            <div className="index_header">
                <div className="header-logo">
                    <img src="../../image/logo.png" />
                </div>
                <div className="header-middle">
                    <div className="header-middle-top">
                        <span>
                            {this.props.headerdatas.depCityName}
                            <label>&nbsp;({this.props.headerdatas.depCityCode})</label>
                        </span>

                        <img src="../../image/plane.png" />
                        <span>
                            {this.props.headerdatas.arrCityName}
                            <label>&nbsp;({this.props.headerdatas.arrCityCode})</label>
                        </span>

                    </div>
                    <div className="header-middle-bottom">
                        <hr />
                        <div className="flight-time">
                            <FlyTime flyInfo={this.props.headerdatas}/>
                        </div>
                    </div>
                </div>
                <div className="header-right">
                    <div className="weather">
                        <img src={imgUrl} className="xue" />
                        <div className="weather-position1">
                            <img src="../../image/dingwei.png" className="action-placer" />
                            <label>{this.props.weatherInfo.city}</label>
                        </div>
                        <div className="weather-position2">
                            <label>{todayDate}</label>
                            <label>&nbsp;星期{weekInfo}</label>
                        </div>
                    </div>
                    <div className="temperature">
                        <span>{this.props.weatherInfo.temperature}</span>
                        <span>{this.props.weatherInfo.day[2]}</span>
                        <span>{this.props.weatherInfo.night[2]}</span>
                    </div>
                </div>
            </div>
        )
    }
}
Header.defaultProps = {
    headerdatas: {},
    weatherInfo: {
        day: [],
        night: [],
        img: '../../image/xue.png',
        temperature: '0'
    }
}

class FlyTime extends Component {

    flyStart() {
        let flyInfo = this.props.flyInfo
        let flyStartTime = flyInfo.atd || flyInfo.etd || flyInfo.std
        return flyStartTime
    }
    flyEnd() {
        let flyInfo = this.props.flyInfo
        let flyEndTime = flyInfo.ata || flyInfo.eta || flyInfo.sta
        return flyEndTime
    }
    decideShow() {
        let startdiff = this.flyStart()
        let startdiffFormat = new Date(startdiff)
        let nowTime = new Date()
        if(nowTime < startdiffFormat){
            return true
        }else{
            return false
        }
    }

    render() {
        let decideShow = this.decideShow()
        let container
        if(decideShow) {
            container = (
                <div>
                    <span>离飞机起飞还有</span>
                    <CountDown endTime={this.flyStart()} type='sub'/>
                </div>
            )
        }else{
            container = (
                <div>
                    <span>飞机已飞</span>
                    <CountDown endTime={this.flyStart()} type='add'/>
                    <span>,&nbsp;预计到达时间还有</span>
                    <CountDown endTime={this.flyEnd()} type='sub'/>
                </div>
            )
        }
        return (
            <div>
                {container}
            </div>
        )
    }
}

class CountDown extends Component {
    static get defaultProps() {
        return {
            endTime: '2016-05-10 11:10:00',
            type: 'sub'
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            countDown: ''
        };
    }
    formatSeconds (date,format) {
        if (Object.prototype.toString.call(date) !== "[object Date]") {
            date = new Date(date);
        }
        var map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                  v = '0' + v;
                  v = v.substr(v.length - 2);
                }
                return v;
            } else if (t === 'y') {
                return (date.getFullYear() + '').substr(2 - all.length);
            }
            return all;
        });
        return format;
    }

    diffTimeSecond() {
        let nowTime = new Date()
        let endTimeSecond = new Date(this.props.endTime)
        let resultTimeSecond

        if (this.props.type === 'sub') {
            resultTimeSecond = endTimeSecond - nowTime - 28800000
        } else {
            resultTimeSecond = nowTime - endTimeSecond -28800000
        }

        return resultTimeSecond
    }

    formatCount() {
        let formatResult = this.formatSeconds(this.diffTimeSecond(),'hh:mm:ss')
        return formatResult
    }

    componentDidMount(){
        setInterval(
            function() {
                this.setState({
                    countDown: this.formatCount()
                })
            }.bind(this)
            , 1000
        )
    }

    render() {
        return (
            <span>
            {this.state.countDown}
            </span>
        )
    }
}

class ShowSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    componentDidMount(){
        setTimeout(function(){
            var mySwiper = new Swiper('.swiper-container',{
                autoplay : 1000,
                pagination: '.swiper-pagination',
                paginationElement : 'li',
                autoplayStopOnLast : false,
            });
        },300);
    }
    render(){
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        this.props.silderImage.map((item,i) => {
                            return (
                                <div className="swiper-slide" key={i}>
                                    <img src={item.cover_image} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="swiper-pagination"></div>
            </div>
        )
    }
}
ShowSlider.defaultProps = {
    silderImage:[

    ]
}
class NavigationItem extends Component {
    render(){
        return (
            <div className="navigation">
                <ul className="navigation-item">
                    <li className="item-top">
                        <a href='/html/news.html'>
                            <img src="../../image/newsIcon.png" />
                            <div>资讯头条</div>
                        </a>
                    </li>
                    <li className="item-top">
                        <a href="/html/destination.html">
                            <img src="../../image/placeIcon.png" />
                            <div>目的地</div>
                        </a>
                    </li>
                    <li className="item-top">
                        <a href='/html/social.html'>
                            <img src="../../image/socialIcon.png" />
                            <div>社交</div>
                        </a>
                    </li>
                    <li className="item-top">
                        <a href='/html/ecommerce.html'>
                            <img src="../../image/shoppingIcon.png" />
                            <div>空中电商</div>
                        </a>
                    </li>
                    <li className="item-top">
                        <a href="/html/media.html#/hotplay">
                            <img src="../../image/videoIcon.png" />
                            <div>影音娱乐</div>
                        </a>
                    </li>
                    <li className="item-top">
                        <a href='/html/stocks.html'>
                            <img src="../../image/gupiaoIcon.png" />
                            <div>股票行情</div>
                        </a>
                    </li>
                    <li >
                        <img src="../../image/zhanweiIcon.png" />
                        <div></div>
                    </li>
                    <li >
                        <a href='/html/airport_pickup.html'>
                            <img src="../../image/jiesongIcon.png" />
                            <div>接送机</div>
                        </a>
                    </li>
                    <li >
                        <a href='/html/game.html'>
                            <img src="../../image/gameIcon.png" />
                            <div>游戏</div>
                        </a>
                    </li>
                    <li >
                        <a href="/html/eyesonworld.html">
                            <img src="../../image/worldIcon.png" />
                            <div>丽眼看世界</div>
                        </a>
                    </li>
                    <li >
                        <a href="/html/about.html">
                            <img src="../../image/aboutIcon.png" />
                            <div>关于深航</div>
                        </a>
                    </li>
                    <li >
                        <img src="../../image/zhanweiIcon.png" />
                        <div></div>
                    </li>
                </ul>
            </div>
        )
    }
}
class ModuleTitle extends Component {
    render(){
        return (
            <div className="module-title">
                <div className="left-line">
                    <img src="../../image/line_left.png"/>
                </div>
                <div className="title-content">
                    <a className="titleColor">{this.props.titleMessage}</a>
                    <label className="english">{this.props.titleEnglish}</label>
                </div>
                <div className="right-line">
                    <img src="../../image/line_right.png"/>
                </div>
            </div>
        )
    }
}
class Shadeshow extends Component {
    render(){
        return (
            <section className={"shad-show2"+" "+this.props.class_name}>
                <span>{this.props.titleName}</span>
            </section>
        )
    }
}
class VideoModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstVideoMessage:{},
            otherVideoMessage:[]
        };
    }
    componentWillReceiveProps(nextProps){
        var gg = nextProps.showVideo;
        this.setState({
            firstVideoMessage:gg[0],
            otherVideoMessage:gg.slice(1)
        })
    }
    render(){
        return (
            <div className="video-module">
                <ModuleTitle titleMessage="精彩视频" titleEnglish="THE GREAT VIDEO"/>
                <div className="video-item">
                    <div className="video-item-left">
                        <section className="main-video">
                            <img src={this.state.firstVideoMessage.cover_image} />
                        </section>
                        <section className="shad-show">
                            <p>{this.state.firstVideoMessage.title}</p>
                            <p>{this.state.firstVideoMessage.info}</p>
                        </section>
                        <img src="../../image/play_icon.png"  className="play_icon"/>
                    </div>
                    <div className="video-item-right">
                        <div>
                            {
                                this.state.otherVideoMessage.map(item => {
                                    return (
                                        <section key={item.index}>
                                            <img src={item.cover_image} />
                                            <img src="../../image/play_icon.png"  className="play_icon"/>
                                        </section>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class ZhuanQu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAirlineTopLeft:{},
            showAirlineTopRight:{},
            showAirlineBottom:[]
        };
    }
    componentWillReceiveProps(nextProps){
        let tt = nextProps.showAirline;
        this.setState({
            showAirlineTopLeft:tt[0],
            showAirlineTopRight:tt[1],
            showAirlineBottom:tt.slice(2)
        })
    }
    render(){
        return (
            <div className="zhuanqu">
                <ModuleTitle2 titleMessage="深航专区" titleEnglish="THE GREAT VIDEO" colors='white' englishColor="english"/>
                <div className="test_box">
                    <div className="tops">
                        <div className="topleft">
                            <div>
                                <img src={this.state.showAirlineTopLeft.cover_image} />
                            </div>
                            <Shadeshow titleName={this.state.showAirlineTopLeft.title} />
                        </div>
                        <div className="topright">
                            <div>
                                <img src={this.state.showAirlineTopRight.cover_image} />
                            </div>
                            <Shadeshow titleName={this.state.showAirlineTopRight.title} />
                        </div>
                    </div>
                    <div className="bottms">
                        {
                            this.state.showAirlineBottom.map((item,i) => {
                                return (
                                    <div className={i>0?'pl':''} key={item.index}>
                                        <section>
                                            <img src={item.cover_image}/>
                                        </section>
                                        <Shadeshow titleName={item.title} class_name="zq-bottom" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
class Zonghe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zongheTopLeft:{},
            zongheTopMiddle:[],
            zongheTopRight:{},
            zongheBottom:[]
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            zongheTopLeft:nextProps.showRecommend[0],
            zongheTopMiddle:nextProps.showRecommend.slice(1,3),
            zongheTopRight:nextProps.showRecommend[3],
            zongheBottom:nextProps.showRecommend.slice(4)
        });
    }
    render(){
        return (
            <div>
                <ModuleTitle2 titleMessage="综合专区" titleEnglish="THE GREAT VIDEO" colors='white' englishColor="english"/>
                <div className="zonghe">
                    <div className="zonghe-top">
                        <div>
                            <section>
                                <img src={this.state.zongheTopLeft.cover_image} />
                            </section>
                            <Shadeshow titleName={this.state.zongheTopLeft.title} class_name="zh-bottom" />
                        </div>
                        <div>
                            {
                                this.state.zongheTopMiddle.map(item => {
                                    return (
                                        <section className="zh-middle-image" key={item.index}>
                                            <img src={item.cover_image} />
                                            <Shadeshow titleName={item.title} class_name="zh-bottom-middle" />
                                        </section>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <section>
                                <img src={this.state.zongheTopRight.cover_image} class_name="zh-bottom" />
                            </section>
                            <Shadeshow titleName={this.state.zongheTopRight.title}  class_name="zh-bottom" />
                        </div>
                    </div>
                    <div className="zonghe-bottom">
                        {
                            this.state.zongheBottom.map(item => {
                                return (
                                    <div key={item.index}>
                                        <section>
                                            <img src={item.cover_image} />
                                        </section>
                                        <Shadeshow titleName={item.title} class_name="zh-bottom" />
                                    </div>
                                )
                            })
                        }
                    </div>
               </div>
            </div>
        )
    }
}
class Sginboard extends Component {
    componentDidMount(){
        var sginboard = new Swiper('.sginboard',{
            autoplay : 1000,
            autoplayStopOnLast : false,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
        });
    }
    render(){
        return(
            <div className="swiper-container sginboard">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <img src="../../image/e.jpg" />
                    </div>
                    <div className="swiper-slide">
                        <img src="../../image/e.jpg" />
                    </div>
                    <div className="swiper-slide">
                        <img src="../../image/e.jpg" />
                    </div>
                </div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
        )
    }
}
class OperationItem extends Component {
    render(){
        return (
            <ul className="operation-item">
                <li>
                    <img src="../../image/hulian_icon.png" />
                    <div className="operatio-con">
                        <p>天地互联畅通无阻</p>
                        <p>与地面好友QQ聊天，机上直接刷微博</p>
                    </div>
                </li>
                <li>
                    <img src="../../image/online_game.png" />
                    <div className="operatio-con">
                        <p>联网游戏嗨翻天</p>
                        <p>与地面好友QQ聊天，机上直接刷微博</p>
                    </div>
                </li>
                <li>
                    <img src="../../image/shoppingpay_icon.png" />
                    <div className="operatio-con">
                        <p>购物支付安全快捷</p>
                        <p>与地面好友QQ聊天，机上直接刷微博</p>
                    </div>
                </li>
                <li>
                    <img src="../../image/jiesong_icon.png" />
                    <div className="operatio-con">
                        <p>接送机服务</p>
                        <p>与地面好友QQ聊天，机上直接刷微博</p>
                    </div>
                </li>
            </ul>
        )
    }
}
class IndexBottom extends Component {

    clickBtn(){
        var tt = JSON.stringify({
        "feedback": '"'+this.refs.feedback_con.value+'"',
        "contact": '"'+this.refs.tel_num.value+'"',
        "name":'"'+this.refs.name.value+'"'
    });
    console.log(tt);
        fetch(config.FETCH_URL+"api/1/user/feedback/",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "feedback": '"'+this.refs.feedback_con.value+'"',
                "contact": '"'+this.refs.tel_num.value+'"',
                "name":'"'+this.refs.name.value+'"'
            })
        })
        .then(req => req.json())
        .then(json =>(console.log(json)))
        .catch(error => (console.log(error)))
    }
    render(){
        return (
            <div className="index-bottom">
                <div className="msk">
                    <div className="msk-title">
                        <p>关于我们</p>
                        <p>ABOUT US</p>
                    </div>
                    <div className="msk-content">
                        <div className="msk-content-left">
                            <input type="text" className="username" placeholder="姓名" ref="name" />
                            <input type="tel" className="pwd"  placeholder="手机号码" ref="tel_num"/>
                            <textarea className="text_area" placeholder="请写下您的宝贵意见" ref="feedback_con">
                            </textarea>
                            <button className="opinionBtn" onClick={this.clickBtn.bind(this)}>提交意见</button>
                        </div>
                        <div className="msk-content-right">
                            <ul className="msk-right-icon">
                                <li>
                                    <img src="../../image/bottom_weizhi.png" />
                                    <span>粤ICP备08115151号</span>
                                </li>
                                <li>
                                    <img src="../../image/bottom_lianxi.png" />
                                    <span>010 - 826771035</span>
                                </li>
                                <li>
                                    <img src="../../image/bottom_email.png" />
                                    <span>buliang@shenzhenair</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class ModuleTitle2 extends Component {
    render(){
        return (
            <div className="module-title">
                <div className="left-line">
                    <img src="../../image/backline_left.png"/>
                </div>
                <div className="title-content">
                    <div className={"titleColor"+" "+this.props.colors}>{this.props.titleMessage}</div>
                    <div className={"english"+" "+this.props.englishColor}>{this.props.titleEnglish}</div>
                </div>
                <div className="right-line">
                    <img src="../../image/backline_right.png"/>
                </div>
            </div>
        )
    }
}
export default class Home extends Component {
    constructor(props) {
        super(props);
        let thiss = this;
        thiss.state = {
            ifLoading:true,
            ifFixed:false
        };
    }
    handleData(jsons){
        if(jsons.code == 0){
            this.setState({
                show_flight:jsons.data.flight,
                show_weather:jsons.data.weather,
                show_focus_pic:jsons.data.focus_pic,
                show_video:jsons.data.video,
                show_airline:jsons.data.airline,
                show_recommend:jsons.data.recommend,
                ifLoading:false
            });
        }
    }
    componentDidMount(){
        var this_ = this;
        //alert(document.body.clientWidth);
        fetch(config.FETCH_URL+"api/1/op/home/")
            .then(req => req.json())
            .then(json => {
                this_.handleData(json)
            })
            .catch(function(error){
                console.log(error);
                this_.setState({
                    ifLoading:false
                })
            })
    }
    render(){

        return (
            <div>
                <NavigationBar/>
                <Loading ifLoading={ this.state.ifLoading } />
                <Header headerdatas={ this.state.show_flight } weatherInfo={ this.state.show_weather}/>
                <ShowSlider silderImage={ this.state.show_focus_pic }/>
                <NavigationItem />
                <VideoModule showVideo={ this.state.show_video } />
                <ZhuanQu showAirline={ this.state.show_airline } />
                <Zonghe showRecommend={ this.state.show_recommend } />
                <Sginboard />
                <OperationItem />
                <IndexBottom />
            </div>
        )
    }
}
