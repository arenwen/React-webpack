import React, { Component, PropTypes } from 'react'
import Image from '../Image'
import { Link } from 'react-router'
import SwitchCity from '../SwitchCity'
import config from '../../../commonConfig'
import fetch from 'isomorphic-fetch'
let $ = window.jQuery
// 搜索——————
export default class FocusContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showSelectCity: false,
            code: 1,
            data: []
        }
    }

    onInputClick() {
        this.setState({
            showSelectCity: true
        })
    }

    onSwitchCityClose() {
        this.setState({
            showSelectCity: false
        })
    }
    componentDidMount() {
        fetch(config.DISCOVERY_CITIES)
            .then(response => response.json())
            .then(json => this.setStateByCode(json))
            .catch(e => console.log("Oops,error", e))
    }

    setStateByCode(json) {
        if(json.code != 0) {
            console.log("Oops,error", json.message)
            return
        }

        this.setState({
            code: json.code,
            data: json.data
        })
    }
    render() {
        let wrapStyle = {
            width:'100%',
            height:'33.23vw',
            backgroundSize:'100%',
            position:'relative'
        }
        let focusImg = this.state.data.cover_url
        return (

			<div style={wrapStyle}>
                <Image
                    imgRatio="33.23%"
                    imgSrc={focusImg}
                />
                <Search onInputClick={this.onInputClick.bind(this)} recommends={this.state.data.hot_city} />
                {this.state.showSelectCity ? <SwitchCity  onClose={this.onSwitchCityClose.bind(this)} /> : ''}
            </div>
        )

    }
}
FocusContainer.defaultProps = {
    focusImgInfo:[
        {
            cover_image: '../image/food1.jpg'
        }
    ]
}
class Search extends Component {
    static get defaultProps() {
        return {
            recommends: []
        }
    }
    constructor(props) {
        super(props)
    }

    render() {
        let containerStyle = {
            color:'#fff',
            backgroundColor:'rgba(0,0,0,.4)',
            position:'absolute',
            top:'60%',
            left:'50%',
            WebkitTransform:'translate(-50%,-50%)',
            padding:'14px 44px 8px 44px'
        }

        return (
            <div style={containerStyle}>
                <SearchTitle title="世界那么大，我想去看看"/>
                <InputBox onClick={this.props.onInputClick} />
                <SearchRecommend recommends={this.props.recommends} />
            </div>
        )
    }
}

class SearchTitle extends Component {
    render() {
        let titleStyle = {
            fontSize:'18px' }
        return (
            <p style = {titleStyle}>{this.props.title}</p>
        )
    }
}

class SearchRecommend extends Component {

    render() {
        let recomentListStyle = {
            display: 'inline-block'
        }
        const recommends = this.props.recommends.map(function(recommend, i) {
            let LinkTo = `/city/${recommend.id}/tab/foods/`
            return (
                <li style={recomentListStyle} key={Math.random()} >
                    <Link to={LinkTo} >
                        <RecomCityItem name = {recommend.name}/>
                    </Link>
                </li>
            )
        })
        return (
            <ul>热门城市：
            {recommends}
            </ul>
        )
    }
}
class RecomCityItem extends Component {
    static get defaultProps() {
        return {
            name: {}
        }
    }
    onClick(event) {
        window.store.title = this.props.name
        window.store.city = this.props.name

        this.props.onClick(event)
    }
    render() {
        let recomCityItemStyle = {
            display: 'inline-block',
            color: '#fff',
            padding: '0 6px'
        }

        return (
            <div style = {recomCityItemStyle} onClick = {this.onClick.bind(this)}>
                {this.props.name}
            </div>
        )
    }
}

class InputBox extends Component {
    render() {
        let inputBoxStyle = {
            position: 'relative'
        }
        let inputStyle = {
            width:'410px',
            height:'56px',
            margin:'12px 0',
            borderRadius:'5px',
            fontSize:'18px',
            paddingLeft:'15px'

        }
        let searchIconStyle = {
            position:'absolute',
            width: '34px',
            height: '34px',
            top:'22px',
            left:'380px'
        }
        let imgStyle = {
            width: '100%'
        }
        return (
            <div style={inputBoxStyle} onClick={this.props.onClick}>
                <input type="text" style = {inputStyle} placeholder="我想去..." />
                <div style={searchIconStyle}>
                    <img style={imgStyle} src="../image/searchicon.png" alt="" />
                </div>
            </div>
       )
    }
}
