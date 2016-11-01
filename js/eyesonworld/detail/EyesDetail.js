import React, { Component, PropTypes } from 'react'
import Image from '../Image'
import config from '../../../commonConfig'
import fetch from 'isomorphic-fetch'
import Loading from '../../util/loading'

export default class EyesDetail extends Component {
    constructor() {
        super()
        this.state = {
            data: {
                content: '',
                cover_image:{
                    url:''
                }
            },
            ifLoading:true
        }
    }
    componentDidMount() {
        // todo
        fetch(config.FETCH_URL+`api/1/liyan/detail/?cid=${this.props.cid}`)
            .then(response => response.json())
            .then(json => this.setStateByCode(json))
            .catch(e => console.log('Oops,error', e))
    }

    setStateByCode(json) {
        if(json.code != 0) {
            return
        }

        this.setState({
            code: json.code,
            data: json.data,
            ifLoading: false
        })
        let title = `丽眼看世界——${json.data.destination}篇`
        this.props.headerTitle(title)
    }
    render() {
        let imgWrapStyle = {
            width: '100%',
            backgroundColor: '#f4f4f4'
        }
        return (
            <div style = {imgWrapStyle}>
                <Loading ifLoading={ this.state.ifLoading } />
                <DetailBanner bannerInfo={this.state.data} cid={this.props.cid}/>
                <TimeTableContainer timeInfo={this.state.data}/>
                <DetailContent contentInfo={this.state.data.content}/>
            </div>
        )
    }
}

class DetailBanner extends Component {
    static get defaultProps() {
        return {
            bannerInfo:{
                author: '',
                cameraman: '',
                title: '',
                subtitle: ''
            }
        }
    }

    componentWillReceiveProps(nextProps){
    }
    render() {
        let detailBannerStyle = {
            width: '100%',
            position: 'relative',
            paddingBottom: '42.97%',
            zIndex: '9'
        }
        let imageStyle = {
            width: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '-1'
        }
        let wordStyle = {
            width: '65%',
            padding: '4px',
            position: 'absolute',
            left:'0',
            bottom: '0',
            paddingLeft: '20px'
        }
        let bannerTitleStyle = {
            color: '#fff',
            fontSize: '22px',
            fontWeight: 'bold',
            lineHeight: '2',
            padding: '0'
        }
        let authorInfoStyle = {
            color: '#fff',
            fontSize: '14px',
            fontWeight: 'normal',
            paddingLeft: '15px'
        }
        let bannerSubtitleStyle = {
            color: '#fff',
            fontSize: '16px',
            lineHeight: '1.4',
            padding: '0'
        }
        let feedBackStyle = {
            width: '20%',
            position: 'absolute',
            right: '0',
            bottom: '0'
        }
        let authorWrap = {
            display: 'inline-block'
        }
        let authorInfo = this.props.bannerInfo.author?
        <div style={authorWrap}>
        <span style={authorInfoStyle}>{this.props.bannerInfo.author}/文</span>
        <span style={authorInfoStyle}>{this.props.bannerInfo.cameraman}/图</span>
        </div> : ''
        return (
            <div style={detailBannerStyle}>
                <div style={imageStyle}>
                    <Image imgRatio='42.97%' imgSrc={this.props.bannerInfo.cover_image.url}/>
                </div>
                <div style={wordStyle}>
                    <p style={bannerTitleStyle}>
                    {this.props.bannerInfo.title}
                        {authorInfo}
                    </p>
                    <p style={bannerSubtitleStyle}>{this.props.bannerInfo.subtitle}</p>
                </div>
                <div style={feedBackStyle}>
                    <Feedback feedBackInfo={this.props.bannerInfo} cid={this.props.cid} />
                </div>
            </div>
        )
    }
}

class Feedback extends Component {
    static get defaultProps() {
        return {
            feedBackInfo:{
                agree: 0,
                footprints: 0,
                like: 0
            }
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            agree: JSON.parse(localStorage.agree) || false,
            like: JSON.parse(localStorage.like) || false,
            agreeNum: this.props.feedBackInfo.agree,
            likeNum: this.props.feedBackInfo.like
        }
        console.log('propsprops',this.props.feedBackInfo.like)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            agreeNum: nextProps.feedBackInfo.agree,
            likeNum: nextProps.feedBackInfo.like
        })
    }

    onAgreeClick() {
        let newAgree = !this.state.agree
        this.setState({
            agree: newAgree,
            agreeNum: newAgree ? Number(this.state.agreeNum) + 1 : Number(this.state.agreeNum) - 1
        })
        localStorage.agree = newAgree
        let operaNum = newAgree ? 1 : 0
        fetch(config.FETCH_URL+`api/1/liyan/social/?cid=${this.props.cid}&subtype=agree&operate=${operaNum}`)

    }

    onLikeClick() {
        let newLike = !this.state.like
        this.setState({
            like: newLike,
            likeNum: newLike ? Number(this.state.likeNum) + 1 : Number(this.state.likeNum) - 1
        })
        localStorage.like = newLike
        let operaNum = newLike ? 1 : 0
        fetch(config.FETCH_URL+`api/1/liyan/social/?cid=${this.props.cid}&subtype=like&operate=${operaNum}`)

    }

    render() {

        let feedbackStyle = {
            display: '-webkit-flex'
        }
        let itemWrapStyle = {
            WebkitFlex: '1'
        }
        let imgStyle = {
            display: 'block',
            width: '30px',
            height: '30px',
            margin: '0 auto'
        }
        let numStyle = {
            color: '#fff',
            textAlign: 'center'
        }

        let agreeImg = this.state.agree ? '../../../image/agreep.png' :
            '../../../image/agree.png'
        let footprintsImg = '../../../image/footprints.png'
        let likeImg = this.state.like ? '../../../image/likep.png' :
            '../../../image/like.png'
        let footprintsNUm = this.props.feedBackInfo.footprints

        return (
            <div style={feedbackStyle}>
                <div style={itemWrapStyle}>
                    <img
                        style={imgStyle}
                        src={agreeImg}
                        alt="agree"
                        onClick={this.onAgreeClick.bind(this)}
                         />
                    <p style={numStyle}>{this.state.agreeNum}</p>
                </div>
                <div style={itemWrapStyle}>
                    <img
                        style={imgStyle}
                        src={footprintsImg}
                        alt="footprints"
                    />
                    <p style={numStyle}>{footprintsNUm}</p>
                </div>
                <div style={itemWrapStyle}>
                    <img
                        style={imgStyle}
                        src={likeImg}
                        alt="like"
                        onClick={this.onLikeClick.bind(this)}
                     />
                    <p style={numStyle}>{this.state.likeNum}</p>
                </div>
            </div>
        )
    }
}

class TimeTableContainer extends Component {
    static get defaultProps() {
        return {
            timeInfo:{
                tips: '',
                flight: [],
                other: ''
            }
        }
    }
    render() {
        let timeContainerStyle = {
            backgroundColor: '#f4f4f4'
        }
        let contentWrapStyle = {
            width: '95%',
            margin: '0 auto'
        }
        let titleStyle = {
            borderLeft: '10px solid #010101',
            margin: '20px 0',
            fontSize: '22px',
            fontWeight: 'bold',
            padding: '0 0 0 11px'
        }
        let timeTipsStyle = {
            color: '#000',
            fontSize: '12px',
            textAlign: 'right'
        }
        let tipsInfo = {__html: this.props.timeInfo.tips}
        let otherInfo = {__html: this.props.timeInfo.other}

        return (
            <div style={timeContainerStyle}>
                <div style={contentWrapStyle}>
                    <p style={titleStyle}>TIPS</p>
                    <div dangerouslySetInnerHTML={tipsInfo} />
                    <TimeTableContent flightInfo={this.props.timeInfo.flight}/>
                    <p style={timeTipsStyle}>（以上航班时刻仅供参考，购票时请咨询95080）</p>
                    <div dangerouslySetInnerHTML={otherInfo} />
                </div>
            </div>
        )
    }
}

class TimeTableContent  extends Component {
    static get defaultProps() {
        return {
            flightInfo: [
                {
                    flight_number: '',
                    from_city: '',
                    from_time: '',
                    from_airport: '',
                    stop: null,
                    to_city: '',
                    to_time: '',
                    to_airport: '',
                    cycle: ''
                }
            ]
        }
    }
    render() {
        let timeListWrapStyle = {
            background: 'url(../../../image/bottomcut.png) no-repeat center bottom',
            backgroundSize: '150%',
            backgroundColor: '#fff',
            paddingBottom: '20px'
        }
        let theadStyle = {
            display: '-webkit-flex',
            fontSize: '16px',
            color: '#929292',
            backgroundColor: '#fff',
            borderRadius: '5px 5px 0 0',
            lineHeight: '3'
        }
        let liWrapStyle = {
            display: '-webkit-flex',
            background: 'url(../../../image/centercut.png) no-repeat center top',
            backgroundSize: 'contain',
            padding: '30px 0 10px 0'

        }
        let smallPartStyle = {
            WebkitFlex: '1',
            textAlign: 'center',
            vertivalAlign: 'middle'
        }
        let theadprocessStyle = {
            WebkitFlex: '4',
            textAlign: 'center'
        }
        let processStyle = {
            display: '-webkit-flex',
            WebkitFlex: '4',
            textAlign: 'center'
        }
        let processItemStyle = {
            WebkitFlex: '1',
            marginTop: '-20px'
        }
        let timeStyle = {
            fontSize: '22px',
            fontWeight: 'bold',
            paddingBottom: '0'
        }
        let airportStyle = {
            fontSize: '14px',
            color: '#8a8a8a',
            textAlign: 'center',
            padding: '0'
        }
        let stoppingWrapStyle = {
            background: 'url(../../../image/stopping.png) no-repeat center center',
            backgroundSize: 'contain',
            paddingTop: '20%'
        }
        let stoppingStyle = {
            padding: '0',
            fontSize: '14px'
        }
        let stopping = {
            display: 'inline-block',
            textAlign: 'center',
            width: '45px',
            margin: '0 auto',
            backgroundColor: '#fff'
        }
        let stoppingCity = {
            padding: '0',
            fontSize: '14px',
            color: '#8a8a8a'
        }
        let orderStyle = {
            fontSize: '14px',
            color: '#fff',
            backgroundColor: '#d93600',
            display: 'inline-block',
            width: '80%',
            lineHeight: '2',
            borderRadius: '5px'
        }
        let flights = this.props.flightInfo.map((flight,i) => {
            let stoppingWord = flight.stop === null? null: '经停'
            return (
                <li style={liWrapStyle} key={i}>
                    <div style={smallPartStyle}>{flight.flight_number}</div>
                    <div style={smallPartStyle}>{flight.from_city}</div>
                    <div style={processStyle}>
                        <div style={processItemStyle}>
                            <p style={timeStyle}>{flight.from_time}</p>
                            <p style={airportStyle}>{flight.from_airport}</p>
                        </div>
                        <div style={processItemStyle}>
                            <div style={stoppingWrapStyle}>
                                <p style={stoppingStyle}><span style={stopping}>{stoppingWord}</span></p>
                                <p style={stoppingCity}>{flight.stop}</p>
                            </div>
                        </div>
                        <div style={processItemStyle}>
                            <p style={timeStyle}>{flight.to_time}</p>
                            <p style={airportStyle}>{flight.to_airport}</p>
                        </div>
                    </div>
                    <div style={smallPartStyle}>{flight.to_city}</div>
                    <div style={smallPartStyle}>{flight.cycle}</div>
                    <div style={smallPartStyle}>
                        <a href={flight.link}>
                            <span style={orderStyle}>现在预定</span>
                        </a>
                    </div>
                </li>
            )
        })

        return (
            <div>
                <ul style={timeListWrapStyle}>
                    <li style={theadStyle}>
                        <div style={smallPartStyle}>航班号</div>
                        <div style={smallPartStyle}>出发城市</div>
                        <div style={theadprocessStyle}>起飞降落时间</div>
                        <div style={smallPartStyle}>到达城市</div>
                        <div style={smallPartStyle}>班期</div>
                        <div style={smallPartStyle}></div>
                    </li>
                    {flights}
                </ul>
            </div>
        )
    }
}
class DetailContent extends Component {
    static get defaultProps() {
        return {
            contentInfo: ''
        }
    }
    render() {
        let detailContentStyle = {
            width: '100%',
            backgroundColor: '#fff'
        }
        let contentStyle = {
            width: '87%',
            margin: '0 auto',
            padding: '20px 0'
        }
        let contentInfo = {__html: this.props.contentInfo}
        return (
            <div style={detailContentStyle}>
                <div style={contentStyle}>
                     <div dangerouslySetInnerHTML={contentInfo} />
                </div>
            </div>
        )
    }
}
