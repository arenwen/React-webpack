import React, { Component, PropTypes } from 'react'
import LinkImg from '../LinkImg'
import Image from '../Image'

export default class RecommendTypeList extends Component {
    static get defaultProps() {
        return {
            cid: 1,
            tid: 'foods',
            data: []
        }
    }

    constructor(props) {
        super(props)
    }

    getContentByTab(tid) {
        let TypeContainer = null

        if(tid == 'foods') {
            TypeContainer = (
                <FoodWrap cid={this.props.cid} data={this.props.data} />
            )
        }

        if(tid == 'sceneries') {
            TypeContainer = (
                <ScenicWrap cid={this.props.cid} data={this.props.data} />
            )
        }
        if(tid == 'shopping') {
            TypeContainer = (
                <ShoppingWrap cid={this.props.cid} data={this.props.data} />
            )
        }

        return TypeContainer
    }

    render() {
        let mainStyle = {
            width: '96%',
            minWidth:'600px',
            margin: '0 auto'
        }

        return (
            <div style={mainStyle}>
                {this.getContentByTab(this.props.tid)}
            </div>
        )
    }
}

// 好吃的
class FoodWrap extends Component {
    static get defaultProps() {
        return {
            cid: 1,
            data: []
        }
    }
    constructor(props) {
        super(props)
    }
    render() {
        let listWrap = {
            display:'-webkit-flex',
            background: 'url(../image/dashedcut.png) repeat-x bottom',
            backgroundSize: '80%'
        }
        let listItemLeft = {
            WebkitFlex: '5',
            padding: '2%'
        }
        let listItemRight = {
            WebkitFlex: '11',
            padding: '2% 0',
            position: 'relative'
        }
        const data = this.props.data.map((list) => {
            return (
                <li style={listWrap} key={Math.random()}>
                    <div style={listItemLeft}>
                        <AtlasCover imgInfo={list} cid={this.props.cid}/>
                    </div>
                    <div style={listItemRight}>
                        <Introduction intro={list.abstract}/>
                        <Recommend recommends={list.restaurant} />
                    </div>
                </li>
            )
        })
        return (
            <ul>
                {data}
            </ul>
        )
    }
}

class AtlasCover extends Component {
    render() {
        let imageWrapStyle = {
            background: 'url(../../image/atlas.png) no-repeat center',
            backgroundSize: '100%',
            paddingRight:'5%',
            paddingBottom: '5%'
        }
        let mainLink = {
            display:'block',
            textDecoration:'none'
        }

        let linkImgProps = {
            url: `/city/${this.props.cid}/atlas/${this.props.imgInfo.id}/`,
            imgRatio: '71.15%',
            imgSrc: this.props.imgInfo.image_urls[0],
            imgTitle: '图集',
            imgs: this.props.imgInfo.image_urls
        }

        return (
            <div>
                <div style={imageWrapStyle}>
                    <div style={mainLink}>
                        <LinkImg {...linkImgProps} />
                    </div>
                </div>
            </div>
        )
    }
}
class Introduction extends Component {
    render() {
        let titleStyle = {
            color: '#666',
            fontSize: '16px',
            paddingBottom: '1%'
        }
        let introStyle = {
            color: '#333',
            fontSize: '16px'
        }
        return (
            <div>
                <p style={titleStyle}>简介</p>
                <p style={introStyle}>
                {this.props.intro}
                </p>
            </div>
        )
    }
}

class Recommend extends Component {
    static get defaultProps() {
        return {
            recommends:[]
        }
    }

    render() {
        let recommendStyle = {
            width: '100%',
            position: 'absolute',
            bottom: '10%'
        }

        let titleStyle = {
            color: '#666',
            fontSize: '16px',
            lineHeight: '2.4'
        }

        return (
            <div >
            {this.props.recommends.length == 0 ? '' :
                <div style={recommendStyle}>
                    <p style={titleStyle}>推荐餐厅</p>
                    <RecommendItem recommends={this.props.recommends}/>
                </div>
            }
            </div>
        )
    }
}

class RecommendItem extends Component {
    render() {
        let itemWrapStyle = {
            display: '-webkit-flex',
            WebkitFlex: '1',
            minWidth: '50%',
            maxWidth: '50%'
        }
        let imgWrapStyle = {
            WebkitFlex: '1',
            maxWidth: '33%',
            minWidth: '33%'
        }
        let wordWrapStyle = {
            WebkitFlex: '2',
            maxWidth:'66%',
            minWidth: '66%',
            position: 'relative',
            overflow: 'hidden'
        }
        let nameStyle = {
            color: '#333',
            fontSize: '16px',
            paddingBottom: '1%',
            lineHeight: '1',
            textIndent: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }
        let addrStyle = {
            color: '#757575',
            fontSize: '12px',
            lineHeight: '1',
            textIndent: '6px',
            background: 'url(../image/locationicon.png) no-repeat 6px top',
            backgroundSize: '10px',
            padding: '0 12px',
            position: 'absolute',
            bottom: '6px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }
        let itemsWrapStyle = {
            width: '100%',
            display: '-webkit-flex'
        }

        const recommends = this.props.recommends.map(function(recommend) {
            return (
                <div style={itemWrapStyle}  key={Math.random()}>
                    <div style={imgWrapStyle}>
                        <Image
                            imgRatio="68.8%"
                            imgSrc={recommend.cover}
                        />
                    </div>
                    <div style={wordWrapStyle}>
                        <p style={nameStyle}>{recommend.name}</p>
                        <div>
                        <p style={addrStyle}>{recommend.addr}</p>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div style={itemsWrapStyle}>
                {recommends}
            </div>
        )
    }
}
// 好玩的
class ScenicWrap extends Component {
    static get defaultProps() {
        return {
            cid: 1,
            data: []
        }
    }
    constructor(props) {
        super(props)
    }

    render() {
        let listWrap = {
            display:'-webkit-flex',
            background: 'url(../image/dashedcut.png) repeat-x bottom',
            backgroundSize: '100%'
        }
        let listItemLeft = {
            WebkitFlex: '5',
            padding: '2%'
        }
        let listItemRight = {
            WebkitFlex: '11',
            padding: '2% 0',
            position: 'relative'
        }

        const data = this.props.data.map((list) => {
            return (
                <li style={listWrap} key={Math.random()}>
                    <div style={listItemLeft}>
                        <AtlasCover imgInfo={list}/>
                    </div>
                    <div style={listItemRight}>
                        <Introduction intro={list.abstract}/>
                        {
                            list.strategy.map((item) => {
                                return (
                                    <ScenicStrategy key={Math.random()} cid={this.props.cid} sid={item.id} info={item} />
                                )
                            })
                        }
                    </div>
                </li>
            )
        })
        return (

            <ul>
                {data}
            </ul>
        )
    }
}
class ScenicStrategy extends Component {
    static get defaultProps() {
        return {
            info: {}
        }
    }

    render() {
        let strategyWrapStyle = {
            display: '-webkit-flex',
            width: '100%',
            position: 'absolute',
            bottom: '10%'
        }
        let imgWrapStyle = {
            WebkitFlex: '10',
            minWidth: '47.62%',
            maxWidth: '47.62%'
        }
        // centercut line
        let strategyLineWrap = {
            WebkitFlex: '1',
            minWidth: '4.76%',
            maxWidth: '4.76%',
            background: 'url(../image/strategyline.png) no-repeat center',
            backgroundSize: '100%'
        }
        let linkImgProps = {
            url: `/city/${this.props.cid}/strategy/${this.props.sid}/`,
            imgRatio: '38.18%',
            imgSrc: '../image/food1.jpg',
            imgTitle: this.props.info.title
        }

        return (
            <div style={strategyWrapStyle}>
                <div style={strategyWrapStyle} key={Math.random()}>
                    <div style={imgWrapStyle}>
                        <LinkImg {...linkImgProps} />
                    </div>
                </div>
            </div>
        )
    }
}
// 值得买
class ShoppingWrap extends Component {
    static get defaultProps() {
        return {
            cid: 1,
            data: []
        }
    }

    constructor(props) {
        super(props)
    }

    render() {
        let listWrap = {
            display:'-webkit-flex',
            background: 'url(../image/dashedcut.png) repeat-x bottom',
            backgroundSize: '80%'
        }
        let listItemLeft = {
            WebkitFlex: '5',
            padding: '2%'
        }
        let listItemRight = {
            WebkitFlex: '11',
            padding: '2% 0',
            position: 'relative'
        }

        const data = this.props.data.map((list) => {
            return (
                <li style={listWrap} key={Math.random()}>
                    <div style={listItemLeft}>
                        <AtlasCover cid={this.props.cid} imgInfo={list}/>
                    </div>
                    <div style={listItemRight}>
                        <Introduction intro={list.abstract}/>
                        <Recommend  />
                    </div>
                </li>
            )
        })
        return (
            <ul>
                {data}
            </ul>
        )
    }
}
