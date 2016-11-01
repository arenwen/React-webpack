import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import LinkImg from '../LinkImg'
import config from '../../../commonConfig'
import Loading from '../../util/loading'
import fetch from 'isomorphic-fetch'


// Main————————
export default class CityRecommend extends Component {
    constructor() {
        super()
        this.state = {
            code: 1,
            data: [],
            ifLoading:true
        }
    }
    static get defaultProps() {
        return {
            imgInfo: {}
        }
    }
    componentDidMount() {
        fetch(config.FETCH_URL+'api/1/discovery/home/')
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
            ifLoading:false
        })
    }

    render() {
        let mainStyle={
            padding:'8px'
        }
        let mainLink = {
            display:'block',
            textDecoration:'none'
        }
        return (
			<div style={mainStyle}>
                <Loading ifLoading={ this.state.ifLoading } />
                <div  style={mainLink} >
                    <FoodBox foodImgInfo={this.state.data.food}/>
                    <ScenicBox scenicImgInfo={this.state.data.travel} />
                    <ShoppingBox shoppingImgInfo={this.state.data.shopping}/>
                </div>
			</div>
		)
    }
}

class ClassTitle extends Component {
    render() {
        let ClassTitleStyle = {
            padding: '26px 0'
        }

        let lineStyle = {
            width:'60%',
            borderBottom:'1px solid #979797',
            margin:'25px auto'
        }

        let contentStyle = {
            backgroundColor:'#fff',
            width:'164px',
            padding:'0 28px',
            margin:'0 auto',
            marginTop:'-46px'
        }

        let imgStyle = {
            width:'42px',
            height:'42px',
            verticalAlign:'middle'
        }

        let wordStyle = {
            fontSize:'22px',
            color:'#5d5d5d',
            paddingLeft:'28px',
            verticalAlign:'middle'
        }

        return (
			<div style={ClassTitleStyle}>
				<div style={lineStyle} />
				<div style={contentStyle}>
					<img  style={imgStyle} src={this.props.imgUrl} />
					<span style={wordStyle}>{this.props.classTitle}</span>
				</div>
                </div>
		)
    }
}

// 美食诱惑
class FoodBox extends Component {
    render() {
        // console.log(this.props.foodImgInfo)
        return (
			<div>
				<ClassTitle classTitle="美食诱惑" imgUrl="../image/foodicon.png" />
				<FoodImgs foodImgInfo={this.props.foodImgInfo} />
            </div>
		)
    }
}

function getLinkImgsProps(data, imgRatios,imgType, onClick) {
    return data.map((item, i) => {
        return {
            url: `/city/${item.cid}/tab/${imgType}/`,
            imgRatio: imgRatios[i],
            imgSrc: item.cover_url,
            imgTitle: item.name,
            index: i,
            onClick: onClick || function() {}
        }
    })
}

class FoodImgs extends Component {
    onClick(ev) {
        let index = ev.target.dataset.index

        window.store.title = this.props.foodImgInfo[index].city_name,
        window.store.city = this.props.foodImgInfo[index].city_name
    }

    render() {
        let wrapStyle = {
            width: '100%',
            display: '-webkit-flex'
        }

        let containerStyle = {
            WebkitFlex: '1'
        }
        let centerContainer= {
            WebkitFlex: '1',
            padding:'0 5px'
        }
        let asideTop = {
            marginBottom:'5px'
        }

        let imgRatios = ['68.78%', '68.78%', '139%', '68.78%', '68.78%']
        let imgProps = getLinkImgsProps(this.props.foodImgInfo, imgRatios,'foods', this.onClick.bind(this))

        return (
			<div style={wrapStyle}>
				<div style={containerStyle}>
					<div style={asideTop}>
                        <LinkImg {...imgProps[0]} index='0'/>
					</div>
					<div>
                        <LinkImg {...imgProps[1]} index='1' />
					</div>
				</div>
				<div style={centerContainer}>
                    <LinkImg {...imgProps[2]} index='2'/>
				</div>
				<div style={containerStyle}>
					<div  style={asideTop}>
                        <LinkImg {...imgProps[3]} index='3' />
					</div>
					<div>
                        <LinkImg {...imgProps[4]} index='4'/>
					</div>
				</div>
            </div>
		)
    }
}

FoodImgs.defaultProps={
    foodImgInfo:[]
}

// 热门景点—
class ScenicBox extends Component {
    render() {
        return (
			<div>
				<ClassTitle classTitle="热门景点" imgUrl="../image/scenicicon.png" />
				<ScenicImgs scenicImgInfo={this.props.scenicImgInfo} />
            </div>
		)
    }
}

class ScenicImgs extends Component {
    onClick(ev) {
        let index = ev.target.dataset.index

        window.store.title = this.props.scenicImgInfo[index].city_name
        window.store.city = this.props.scenicImgInfo[index].city_name
    }
    render() {
        let wrapStyle = {
            width: '100%',
            display: '-webkit-flex'
        }

        let containerStyle = {
            WebkitFlex: '1'
        }
        let bottomImg = {
            marginTop: '5px'
        }

        let centerTop = {
            WebkitFlex: '1',
            padding: '0 5px'
        }

        let imgRatios = ['131.12%', '131.12%', '131.12%', '43.66%']
        let imgProps = getLinkImgsProps(this.props.scenicImgInfo, imgRatios,'sceneries',this.onClick.bind(this))

        return (
			<div>
				<div style={wrapStyle}>
					<div style={containerStyle}>
                        <LinkImg {...imgProps[0]} index='0'/>
					</div>
					<div style={centerTop}>
                        <LinkImg {...imgProps[1]} index='1'/>
					</div>
					<div style={containerStyle}>
                        <LinkImg {...imgProps[2]} index='2'/>
					</div>
				</div>
				<div style={bottomImg}>
                    <LinkImg {...imgProps[3]} index='3'/>
                </div>
			</div>
        )
    }
}

ScenicImgs.defaultProps={
    scenicImgInfo:[]
}
// 购物推荐

class ShoppingBox extends Component {
    render(){
        return (
                <div>
                    <ClassTitle classTitle="购物推荐" imgUrl="../image/buyicon.png" />
                    <ShoppingImgs shoppingImgInfo={this.props.shoppingImgInfo} />
                </div>
            )

    }
}
class ShoppingImgs extends Component {
    onClick(ev) {
        let index = ev.target.dataset.index

        window.store.title = this.props.shoppingImgInfo[index].city_name
        window.store.city = this.props.shoppingImgInfo[index].city_name
    }
    render() {
        let wrapStyle = {
            width:'100%',
            display: '-webkit-flex'
        }

        let containerStyle = {
            WebkitFlex:'1'
        }

        let leftBottom = {
            WebkitFlex:'13',
            paddingRight: '5px'
        }

        let rightBottom = {
            WebkitFlex:'10'
        }

        let centerTop = {
            WebkitFlex:'1',
            padding: '0 5px'
        }

        let bottomContainer = {
            width:'100%',
            display: '-webkit-flex',
            paddingTop: '5px'
        }

        let imgRatios = ['104.09%', '104.09%', '104.09%', '81.12%', '105.4%']
        let imgProps = getLinkImgsProps(this.props.shoppingImgInfo, imgRatios,'shopping',this.onClick.bind(this))

        return (
			<div>
				<div style={wrapStyle}>
					<div style={containerStyle}>
                        <LinkImg {...imgProps[0]}  index='0' />
					</div>
					<div style={centerTop}>
                        <LinkImg {...imgProps[1]}  index='1' />
					</div>
					<div style={containerStyle}>
                        <LinkImg {...imgProps[2]}  index='2'/>
					</div>
				</div>
				<div style={bottomContainer}>
					<div style={leftBottom}>
                        <LinkImg {...imgProps[3]}  index='3'/>
					</div>
					<div style={rightBottom}>
                        <LinkImg {...imgProps[4]}  index='4'/>
					</div>
				</div>
			</div>
		)
    }
}

ShoppingImgs.defaultProps={
    shoppingImgInfo: []
}
