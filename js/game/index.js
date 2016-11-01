import fetch from 'isomorphic-fetch'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Swiper from '../util/swiper'
import '../../less/index/swiper-3.3.1.min'
import Loading from '../util/loading'
import config from '../../commonConfig'


export default class App extends Component {
    constructor() {
        super()
        this.state = {
            code: 1,
            data: {
                focus_pic: [],
                recommend: []
            }
        }
        this._gid = undefined
        this._fgid = undefined
    }

    componentDidMount() {
        fetch(config.API_GAME).then(response => response.json())
            .then(json => {
                if (json.code == 0) {
                    this.setState({
                        code: 0,
                        data: json.data
                    })
                }
            })
            .catch(e => console.log('Oop error', e))
    }

    componentWillReceiveProps(nextProps) {
        console.log('[APP componentWillReceiveProps]', nextProps.params)
        this._gid = nextProps.params.gid
        this._fgid = nextProps.params.fgid
    }

    get selectedGameUrl() {
        let url = undefined
        if (this._gid) {
            url = this.state.data.recommend.find(d => d.gid == this._gid).install_url
        }
        else if (this._fgid) {
            url = this.state.data.focus_pic.find(d => d.cid == this._fgid).target_link
        }
        // console.log('[App selectedGameUrl]', url)
        return url
    }

    render() {
        return (
            <div>
                <Header />
                <Loading ifLoading={ true } />
                {this.props.children ?
                    <Game installUrl={this.selectedGameUrl} />:
                    <div>
                        <ShowSlider silderImage={ this.state.data.focus_pic }/>
                        <Content games={ this.state.data.recommend } />
                    </div>
                }
            </div>
        )
    }
}


class Header extends Component {

    render() {
        let headerStyle = {
            padding:'24px 24px 20px 24px',
            display:'-webkit-flex',
            WebkitJustifyContent: 'space-between',
            justifyContent: 'space-between',
            borderBottom:'2px solid #d93600'
        }
        return (
            <div style={headerStyle}>
                <HeaderTitle backiconUrl="../image/backicon.png"
                             iconUrl="../image/game_icon.png"
                             headerTitle="游戏"
                />
            </div>
        )
    }
}


class HeaderTitle extends Component {
    handleClick() {
        window.history.go(-1)
    }
    render() {

        let backStyle = {
            width: '20px',
            height: '30px',
            display: 'inline-block'
        }
        let iconStyle = {
            width: '100%',
            height: '100%',
            verticalAlign:'middle'
        }
        let destinationiconStyle = {
            width:'38px',
            height: '28px',
            display: 'inline-block',
            margin:'0 18px'
        }
        let titleStyle = {
            fontSize: '22px',
            color: '#D93600',
            verticalAlign:'middle'
        }
        return (
            <div>
                <span style={backStyle} onClick={this.handleClick}>
                    <img style={iconStyle} src={this.props.backiconUrl} />
                </span>
                <span style={destinationiconStyle}>
                    <img style={iconStyle} src={this.props.iconUrl}  />
                </span>

                <span style={titleStyle}>{this.props.headerTitle}</span>
            </div>
        )
    }
}

class ShowSlider extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        setTimeout(function(){
            new Swiper('.swiper-container', {
                autoplay : 1000,
                pagination: '.swiper-pagination',
                paginationElement : 'li',
                autoplayStopOnLast : false
            })
        }, 300)
    }

    render() {
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        this.props.silderImage.map((item, i) => {
                            return (
                                <div className="swiper-slide" key={i}>
                                    <Link to={`focus/${item.cid}`}>
                                    <img style={{width: '100%'}} src={item.cover_image.url} />
                                    </Link>
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


class Content extends Component {
    commonFlex(val) {
        return {
            MozBoxFlex: val,
            WebkitBoxFlex: val,
            OBoxFlex: val,
            MsFlex: val,
            flex: val
        }
    }

    get commonDisplayFlex() {
        return {
            display: 'flex'
        }
    }

    render() {
        const itemStyle = {
            borderBottom: '1px solid #BBBBBB',
            margin: '10px 30px'
        }
        const aStyle = {
            textDecoration: 'none',
            color: '#000'
        }
        const spanNameStyle = {
            fontSize: 21,
            color: '#484949'
        }
        const spanTypeStyle = {
            fontSize: 14,
            color: '#999999'
        }
        const spanTypeValStyle = {
            fontSize: 14,
            color: '#484949'
        }
        const itemBottomStyle = {
            marginBottom: 21
        }
        const games = this.props.games.map((data, i) => {
            return (
                <Link to={`/${data.gid}`} style={aStyle} key={i}>
                <div style={{...itemStyle, ...this.commonDisplayFlex}}>
                    <div style={ this.commonFlex(1) }>
                        <img style={{marginRight:20, width: '50%', float: 'right'}} src={data.image.url} />
                    </div>
                    <div style={ {...this.commonFlex(4), ...itemBottomStyle} }>
                        <div>
                            <span style={spanNameStyle}>{ data.title }</span>
                        </div>
                        <div style={{display: 'flex', marginTop: 8}}>
                            <div style={ {display: 'inline-block', flex: 1} }>
                                <span style={ spanTypeStyle }>类型: </span>
                                <span style={ spanTypeValStyle }>{ data.type }</span>
                            </div>
                        </div>
                        <div style={{marginTop: 10}}>
                            <span style={{display: 'block', color: '#999999', fontSize: 14, marginBottom: 2}}>简介: </span>
                            <span style={ spanTypeValStyle }>{ data.abstract }</span>
                        </div>
                    </div>
                </div>
                </Link>
            )
        })

        return (
            <div style={{marginTop: 40}}>
                {games}
            </div>
        )
    }
}


export class Game extends Component {
    render() {
        let divStyle = {
            width: '100%',
            margin: '0 auto'
        }
        let iframeStyle = {
            height: 800,
            minWidth: '100%',
            border: 0
        }
        // console.log("[Game render]", this.props.installUrl)
        return (
                <div style={divStyle}>
                    <iframe style={iframeStyle} scrolling='no' src={this.props.installUrl} >
                    </iframe>
                </div>
        )
    }
}
