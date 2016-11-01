import React, { Component, PropTypes } from 'react'
import Image from '../Image'
import LinkImg from '../LinkImg'
import config from '../../../commonConfig'
import Loading from '../../util/loading'
import fetch from 'isomorphic-fetch'
import { Link } from 'react-router'
import ReactSwipe from 'react-swipe'

export default class EyesContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: 1,
            focus_pic:[
                {
                    cid: '',
                    cover_image: {}
                }
            ],
            recommend: [
                {
                    cid: '',
                    cover_image: {
                        url: ''
                    }
                }
            ],
            ifLoading:true
        }
    }

    componentDidMount() {
        fetch(config.FETCH_URL+'api/1/liyan/home/')
            .then(response => response.json())
            .then(json => this.setStateByCode(json))
            .catch(e => console.log('Oops,error', e))

        this.props.headerTitle('丽眼看世界')

    }

    setStateByCode(json) {
        if(json.code != 0) {
            return
        }

        let sortedPics = json.data.focus_pic.sort((a, b) => {
            return a.index > b.index ? 1 : -1
        })

        let sortedRecommend = json.data.recommend.sort((a, b) => {
            return a.index > b.index ? 1 : -1
        })

        this.setState({
            code: json.code,
            focus_pic: sortedPics,
            recommend: sortedRecommend,
            ifLoading: false
        })
    }

    render() {

        return (
            <div>
                <Loading ifLoading={ this.state.ifLoading } />
                <SwiperContainer imgs={this.state.focus_pic}/>
                <CitiesContainer citiesWrap={this.state.recommend}/>
            </div>
        )
    }
}
class SwiperContainer extends Component {
    static get defaultProps() {
        return {
            imgs: []
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            index: 0
        }
    }

    onSlider(index) {
        this.setState({
            index: index
        })
    }

    render() {
        let swipeOptions = {
            auto:2000,
            continuous: true,
            callback: this.onSlider.bind(this)
        }
        let swiperWrap = {
            position: 'relative'
        }

        let swiperIndicatorWrap = {
            position: 'absolute',
            bottom: '10%',
            width: '100%'
        }
        let imgsLink = this.props.imgs.map((img,i) => {
            let url = `eyesdetail/${img.cid}`
            return (
                <div key={i}>
                    <LinkImg imgRatio="42.97%" imgSrc={img.cover_image.url} url={url} />
                </div>
            )
        })

        return (
            <div style={swiperWrap}>
                <ReactSwipe className="carousel" swipeOptions={swipeOptions} key={imgsLink.length}>
                    {imgsLink}
                </ReactSwipe>
                <div style={swiperIndicatorWrap}>
                    <SwiperIndicator index={this.state.index} imgs={this.props.imgs}/>
                </div>
            </div>
        )
    }
}
class SwiperIndicator  extends Component {
    static get defaultProps() {
        return {
            imgs: [],
            index: 0
        }
    }

    constructor(props) {
        super(props)
    }

    render() {
        let swiperIndicatorStyle = {
            display: '-webkit-flex',
            width: '35%',
            margin: '0 auto'
        }
        let normalLineStyle = {
            WebkitFlex: '1',
            borderBottom: '1px solid #fff',
            margin: '0 3px'
        }
        let chooseLineStyle = {
            WebkitFlex: '1',
            borderBottom: '5px solid #fff',
            margin: '0 3px'
        }

        let indicators = this.props.imgs.map((item, index) => {
            return (
                <div
                    style={this.props.index === index ? chooseLineStyle : normalLineStyle}
                    key={index}
                >
                </div>
            )
        })
        return (
            <div style={swiperIndicatorStyle}>
                {indicators}
            </div>
        )
    }
}
class CitiesContainer extends Component {

    render() {
        let citiesContainer = {
            backgroundColor: '#f3f2f0',
            padding: '1%'
        }

        return (
            <div style={citiesContainer}>
                <Title />
                <CitiesContent citiesWrap={this.props.citiesWrap} />
            </div>
        )
    }
}

class Title extends Component {
    render() {
        let titleWrap = {
            fontSize: '18px',
            color: '#484949',
            lineHeight: '3',
            textAlign: 'center',
            background: 'url(../../../image/eyesicon.png) no-repeat 41% center',
            backgroundSize: '8%'
        }
        return (
            <div style={titleWrap}>
                丽眼看世界
            </div>
        )
    }
}

class CitiesContent extends Component {

    static get defaultProps() {
        return {
            citiesWrap:[
                {
                    cid: ''
                }
            ]

        }
    }
    render() {
        let citiesContentStyle = {
            width: '100%',
            display: '-webkit-flex'
        }
        let leftContentStyle = {
            WebkitFlex: '5',
            padding: '1.5% 0 0 1%'
        }
        let rightContentStyle = {
            WebkitFlex: '6',
            padding: '1%',
            overflow: 'hidden'
        }
        let rightItemStyle = {
            float: 'left',
            width: '49%',
            padding: '1% 1% 0 0'
        }
        let cities = this.props.citiesWrap
        // todo
        // let rightUrl = `eyesdetail/${cities[0].cid}`
        let rightUrl = `eyesdetail/${cities[0].cid}`
        let leftCities = cities.slice(1)
        let leftCity = leftCities.map((city,i) => {
            let url = `eyesdetail/${city.cid}`
            // todo
            console.log('url is',url)
            return (
                <Link style={rightItemStyle} to={url} key={i}>
                    <CityWrap wrapRatio="101.74%" imgRatio="66.67%" cityInfo={city}/>
                </Link>
            )
        }
    )
        return (
            <div style={citiesContentStyle}>
                <Link style={leftContentStyle} to={rightUrl}>
                    <CityWrap wrapRatio="120.78%" imgRatio="100%"  cityInfo={cities[0]} />
                </Link>
                <div style={rightContentStyle}>
                    {leftCity}
                </div>
            </div>
        )
    }
}

class CityWrap extends Component {
    static get defaultProps() {
        return {
            cityInfo: {
                cover_image: {
                    url: ''
                },
                cid: '',
                title: '',
                price: '',
                subtitle: ''
            }
        }
    }

    render() {
        let cityWrap = {
            width: '100%',
            position: 'relative',
            backgroundColor: '#fff',
            paddingBottom: this.props.wrapRatio
        }
        let cityStyle = {
            width: '100%',
            height: '100%',
            position: 'absolute'
        }
        let wordWrapStyle = {
            padding: '1% 3%'
        }
        let titleStyle = {
            fontSize: '16px',
            color: '#262626',
            padding: '0'
        }
        let introStyle = {
            fontSize: '12px',
            color: '#7c7c7c',
            padding: '4px 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }
        let priceWrap = {
            display: 'block',
            width: '90%',
            overflow: 'hidden',
            padding: '0',
            position: 'absolute',
            bottom: '2px'
        }
        let airTicketStyle = {
            display: 'inline-block',
            fontSize: '12px',
            color: '#4a90e2',
            lineHeight: '1',
            border: '1px solid #4a90e2',
            float: 'left',
            marginTop: '4px',
            padding: '2px 4px'
        }
        let priceStyle = {
            display: 'inline-block',
            fontSize: '18px',
            color: '#d0021b',
            float: 'right'
        }
        let priceStyleSmall = {
            fontSize: '12px'
        }
        let price = this.props.cityInfo.price
        let intPrice = parseInt(price)
        return (
            <div style={cityWrap}>
                <div style={cityStyle}>
                <Image
                    imgSrc={this.props.cityInfo.cover_image.url}
                    imgRatio={this.props.imgRatio}
                 />
                 <div style={wordWrapStyle}>
                     <p style={titleStyle}>{this.props.cityInfo.title}</p>
                     <p style={introStyle}>{this.props.cityInfo.subtitle}</p>
                     <p style={priceWrap}>
                         <span style={airTicketStyle} >机票</span>
                         <span style={priceStyle}>
                             <span style={priceStyleSmall}>￥</span>
                              {intPrice}
                              <span style={priceStyleSmall}> 起</span>
                          </span>
                     </p>
                 </div>
                </div>
            </div>
        )
    }
}
