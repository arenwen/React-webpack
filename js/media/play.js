import { render } from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { Router,Route, hashHistory,Link} from 'react-router'

class ChoiceEpisodes extends Component {
    constructor(props) {
        super(props)
    }
    episodesChoice(e){
        var e = e || window.event;
        let target = e.target || e.srcElement;
        let liItem = document.getElementsByName('item');
        let bb = "border:1px solid #979797;text-align:center;"+
            "color:#fff;"+
            "margin-bottom:2%;"+
            "float:left;width:4%;padding:10px;"+
            "margin-left:3%;";
        let aa = "border:1px solid #979797;text-align:center;"+
            "color:#fff;"+
            "margin-left:3%;margin-bottom:2%;float:left;width:4%;"+
            "background:#D93600;"+
            "border:none;padding:11px" ;

        if(e.target.nodeName == 'LI'){
            for(var i = 0;i < liItem.length ;i++){
                liItem[i].setAttribute('style',bb);
            }
            target.setAttribute('style',aa);
        }
    }
    render(){
        let episodesList = {
            marginRight:'1%',
            padding:'0 7px',
            overflow:'hidden'
        }
        let episodesItem = {
            border:'1px solid #979797',
            textAlign:'center',
            color:'#fff',
            marginLeft:'3%',
            marginBottom:'2%',
            float:'left',
            width:'4%',
            padding:10
        }
        //let connect = Object.assign({background:'#D93600'} ,episodesItem,{border:'none',padding:11});
        let connect = {
            border:'none',
            textAlign:'center',
            color:'#fff',
            marginLeft:'3%',
            marginBottom:'2%',
            float:'left',
            width:'4%',
            background:'#d93600',
            padding:11
        }
        return (
            <ul style={episodesList} onClick={this.episodesChoice.bind(this)}>
                <li style={connect} name='item'>1</li>
                <li style={episodesItem} name='item'>2</li>
                <li style={episodesItem} name='item'>3</li>
                <li style={episodesItem} name='item'>4</li>
                <li style={episodesItem} name='item'>3</li>
                <li style={episodesItem} name='item'>4</li>
                <li style={episodesItem} name='item'>3</li>
                <li style={episodesItem} name='item'>4</li>
                <li style={episodesItem} name='item'>3</li>
                <li style={episodesItem} name='item'>4</li>
                <li style={episodesItem} name='item'>5</li>
                <li style={episodesItem} name='item'>6</li>
                <li style={episodesItem} name='item'>7</li>
                <li style={episodesItem} name='item'>8</li>
                <li style={episodesItem} name='item'>9</li>
                <li style={episodesItem} name='item'>10</li>
            </ul>
        )
    }
}
class Hot extends Component {
    constructor(props) {
        super(props)
    }
    hotPlay(e){
        var e = e || window.event;
        let target = e.target || e.srcElement;
        let choice = document.getElementsByName('choiceTitle');
        let redTriangle = document.getElementsByName('redTriangle');
        var cc = "width: 0;height: 0;border-top: 11px solid transparent;"+
            "border-left: 11px solid #000;"+
            "border-bottom: 11px solid transparent;"+
            "display:block;"+
            "position:absolute;"+
            "left:0;"+
            "top:14";
        var dd = "width: 0;height: 0;border-top: 11px solid transparent;"+
            "border-left: 11px solid #d93600;"+
            "border-bottom: 11px solid transparent;"+
            "display:block;"+
            "position:absolute;"+
            "left:0;"+
            "top:14";
        if(e.target.nodeName == 'SPAN'){
            for(var i=0;i<choice.length;i++){
                choice[i].setAttribute('style','color:#6f6f6f');
            }
            let dataid = target.getAttribute('data-id');
            for(var i=0;i<redTriangle.length;i++){
                redTriangle[i].setAttribute('style',cc);
                if(i == Number(dataid)){
                    redTriangle[i].setAttribute('style',dd);
                }
            }
            target.setAttribute('style','color:#d93600');
        }
    }
    render(){
        let episodesList = {
            width:'94%',
            margin:'0 auto',
            padding:'0 7px',
        }
        let episodesItem = {
            height:40,
            borderTop:'1px solid #4f4f4f',
            borderLeft:'1px solid #4f4f4f',
            borderRight:'1px solid #4f4f4f',
            lineHeight:'40px',
            textAlign:'center',
            color:'#6F6F6F',
            padding:'4px 25px',
            overflow : 'hidden',
            textOverflow: 'ellipsis', 
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WwebkitBoxOrient: 'vertical',
            fontFamily:'HelveticaNeue-Light',
            position:'relative'
        }
        let triangle = {
            width: 0,
            height: 0,
            borderTop: '11px solid transparent',
            borderLeft: '11px solid #000',
            borderBottom: '11px solid transparent',
            display:'block',
            position:'absolute',
            left:0,
            top:14
        }
        //let redTriangle = Object.assign({},triangle,{borderLeft: '11px solid #D93600'});
        let redTriangle = {
            width: 0,
            height: 0,
            borderTop: '11px solid transparent',
            borderLeft: '11px solid #D93600',
            borderBottom: '11px solid transparent',
            display:'block',
            position:'absolute',
            left:0,
            top:14
        }
        //let lastLi = Object.assign({borderBottom:'1px solid #4f4f4f'},episodesItem);
        let lastLi = {
            height:40,
            borderTop:'1px solid #4f4f4f',
            borderLeft:'1px solid #4f4f4f',
            borderRight:'1px solid #4f4f4f',
            borderBottom:'1px solid #4f4f4f',
            lineHeight:'40px',
            textAlign:'center',
            color:'#6F6F6F',
            padding:'4px 25px',
            overflow : 'hidden',
            textOverflow: 'ellipsis', 
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WwebkitBoxOrient: 'vertical',
            fontFamily:'HelveticaNeue-Light',
            position:'relative'
        }
        let choiceTitle = {color:'#d93600'};
        return (
            <ul style={episodesList} onClick={this.hotPlay.bind(this)}>
                <li style={episodesItem} >
                    <label style={redTriangle} data-id='0' name="redTriangle"></label>
                    <span style={choiceTitle} name="choiceTitle" data-id="0">2015-08-26 坏姐姐之拆婚联盟 7</span>
                </li>
                <li style={episodesItem}>
                    <label style={triangle} data-id='1' name="redTriangle"></label>
                    <span name="choiceTitle" data-id="1">2015-08-26 坏姐姐之拆婚联盟 6</span>
                </li>
                <li style={episodesItem} >
                    <label style={triangle} data-id='2' name="redTriangle"></label>
                    <span name="choiceTitle" data-id="2">2015-08-26 坏姐姐之拆婚联盟 5</span>
                </li>
                <li style={lastLi}>
                    <label style={triangle} data-id='3' name="redTriangle"></label>
                    <span name="choiceTitle" data-id="3">2015-08-26 坏姐姐之拆婚联盟 4</span>
                </li>
            </ul>
        )
    }

    // methods
}
export default class Play extends Component {
    constructor(props){
        super(props);
        this.state = {
            progressWidth:0,
            ifPlay:true,
            playBackground:false,
            cursorLeft:0,
            allTime:'00:00:00',
            currentTime:'00:00:00'
        }
    }
    componentWillUnmount(){
        this.refs.videos.removeEventListener('timeupdate',function(){
            console.log("okok");
        });
        this.refs.videos.pause();
    }
    componentDidMount(){
        let self = this;
        let currentTime;
        let duration ;
        let timerate ;
        let allTime ;
        let showAllTime ;
        let showCurrentTime ;
        let timeMes ;
        const location = this.props.location;
        console.log(location.state);
        this.refs.videos.addEventListener('timeupdate', function(){
            currentTime = this.currentTime;
            duration = this.duration;
            timerate = (currentTime*100)/duration;
            allTime = self.formatSeconds(duration*1000,'hh:mm:ss');
            timeMes = self.formatSeconds(currentTime*1000,'hh:mm:ss');
            showAllTime = ('0'+Number(allTime.split(':')[0]-8))+':'+allTime.split(':')[1]+':'+allTime.split(':')[2];
            showCurrentTime = ('0'+Number(timeMes.split(':')[0]-8))+':'+timeMes.split(':')[1]+':'+timeMes.split(':')[2];
            self.setState({
                progressWidth:timerate,
                cursorLeft:timerate,
                allTime:showAllTime,
                currentTime:showCurrentTime
            })
        });
        this.refs.videos.addEventListener('ended', function(){
            self.setState({
                progressWidth:0,
                playBackground:false,
                cursorLeft:0,
                currentTime:'00:00:00'
            })
        });
    }
    formatter(value){
        return `${value}%`;
    }
    playVideo(){
        if(this.state.ifPlay){
            this.refs.videos.play();
            this.setState({
                ifPlay:false,
                playBackground:true
            });
        }else{
            this.refs.videos.pause();
            this.setState({
                ifPlay:true,
                playBackground:false
            });
        }
        
    }
    setProgress(e){
        var e = e || window.event;
        let target = e.target || e.srcElement;
        if(e.target.nodeName === 'SECTION'){
           console.log(target);
        }
        let width = target.clientWidth;
        let rect = target.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        let duration = this.refs.videos.duration;
        let currentTime = (duration * offsetX) / width;
        let timerate = (currentTime * 100) / duration;
        this.refs.videos.currentTime = currentTime;
        this.setState({
            progressWidth:timerate,
            playBackground:true,
            cursorLeft:timerate
        });
        this.refs.videos.play();
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
    next(){

    }
    render(){
        let videoWrapper = {
            position:'relative',
            background:'#000',
            paddingBottom:'5%',
        }
        let progressMiddle = {
            width:'60%',
            height:10,
            borderRaduis:2,
            marginTop:20,
            marginBottom:20,
            position:'relative',
            float:'left',
            top:'25%'
        }
        let wrapperProgre = {
            overflow:'hidden',
            height:100,
            background:'#000',
            width:'100%'
        }
        let progressLeft = {
            float:'left',
            width:'25%',
            position:'relative'
        }
        let progressRight = {
            width:'15%',
            float:'left',
            position:'relative'
        }
        let pause = {
            background:'url(../image/playSprite.png)',
            backgroundSize:'cover',
            backgroundPosition:'center',
            height:48,
            width:48,
            display:'block',
            position:'relative',
            top:26,
            backgroundPositionX:-144,
            backgroundPositionY:0,
            left:'11%'
        }
        let play = {
            background:'url(../image/playSprite.png)',
            backgroundSize:'cover',
            backgroundPosition:'center',
            height:48,
            width:48,
            display:'block',
            position:'relative',
            top:26,
            backgroundPositionX:-96,
            backgroundPositionY:0,
            left:'11%'
        }
        let wrapperpros = {
            background:'#666',
            height:2,
            position:'absolute',
            width:'100%',
            top:4
        }
        let next = {
            width:30,
            height:30,
            position:'absolute',
            left:'41%',
            top:36
        }
        let showTime = {
            color:'#fff',
            position:'absolute',
            left:'61%',
            top:42,
            fontFamily:'HelveticaNeue-Light',
            fontSize:15
        }
        let showAllTime = {
            color:'#fff',
            position:'absolute',
            right:'36%',
            top:42,
            fontFamily:'HelveticaNeue-Light',
            fontSize:15
        }
        let videoMessage = {
            //display: 'flex',
            //display: '-webkit-flex',
            //display: '-moz-flex',
            //flexFlow: 'row',
            //justifyContent:'space-around'
        }
        let styles = {
            // MozBoxFlex: '2',
            // WebkitFlex: '2',
            // MsFlex: '2',
            // flex: 2,
            width:'100%'
        }
        let videoPlayTitle = {
            height:64,
            overflow:'hidden',
            textAlign:'center',
            lineHeight:'64px'
        }
        let title = {
            // float:'left',
            // marginLeft:'3%',
            fontSize:22,
            fontFamily:'HiraginoSansGB-W3',
            color:'#fff',
        }
        let choiceEpisodes = {
            color:'#fff',
            background:'#D93600',
            height:31,
            lineHeight:1.5,
            borderRadius:17,
            fontFamily:'Rectangle',
            fontSize:20,
            marginTop:'1%',
            padding:'1px 20px',
            width:40,
            marginLeft:'3%',
            marginBottom:'3%'
        }
        let videopre = {
            background:'#D93600',
            top:4,
            height:2,
            position:'absolute',
            width:this.state.progressWidth+'%'
        }
        let videoPlayico = {
            width:23,
            height:23,
            marginLeft:'-2%',
            position:'absolute',
            top:-6,
            //left:-6.1,
            left:this.state.cursorLeft+'%'
        }
        return (
            <div style={videoWrapper}>
                <div style={videoPlayTitle}>
                    <span style={title}>大好时光-第3集</span>
                    
                </div>
                <div style={videoMessage}>
                    <video poster='http://api.kitefans.com/static/video/hkhl95131601402/poster_large.jpg' src="http://api.kitefans.com/static/video/hkhl94297627/video_226026839.mp4" style={styles} ref="videos">
                        your browser does not support the video tag
                    </video>
                </div>
                <div style={wrapperProgre}>
                    <div style={progressLeft}>
                        <span onClick={this.playVideo.bind(this)} style={this.state.playBackground == false? play:pause}></span>
                        <img src="../image/next.png" style={next} onClick={this.next.bind(this)}/>
                        <span style={showTime}>{this.state.currentTime}</span>
                    </div>
                    <div style={progressMiddle} onClick={this.setProgress.bind(this)}>
                        <span style={wrapperpros}></span>
                        <span style={videopre}></span>
                        <img style={videoPlayico} src='../image/videoCursor.png'/>
                    </div>
                    <div style={progressRight}>
                        <span style={showAllTime}>{this.state.allTime}</span>
                    </div>
                </div>
                <div style={choiceEpisodes}>选集</div>
                <Hot />
            </div>
        )
    }
}