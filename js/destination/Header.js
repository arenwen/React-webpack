import React, { Component, PropTypes } from 'react'
import SwitchCity from './SwitchCity'

function Store(options) {
    let tmp = {}

    for (let key in options.obj) {
        if (options.obj.hasOwnProperty(key)) {
            tmp[key] = options.obj[key]

            Object.defineProperty(this, key, {
                get: function() {
                    return tmp[key]
                },

                set: function(value) {
                    tmp[key] = value
                    options.onChange({
                        [key]: value
                    })
                }
            })
        }
    }
}

// Header——————
export default class Header extends Component {
    static get defaultProps() {
        return {

        }
    }
    constructor(props) {
        super(props)

        this.state = {
            title: '目的地',
            city: '北京',
            showSelectCity: false
        }
    }

    onLocationClick() {
        this.setState({
            showSelectCity: true
        })
    }

    onSwitchCityClose() {
        this.setState({
            showSelectCity: false
        })
    }

    onSwitchCityClick() {
        this.setState({
            showSelectCity: false
        })
    }

    componentDidMount() {
        window.store = new Store({
            obj: {
                title: '',
                city: '北京'
            },
            onChange: this.setState.bind(this)
        })
    }

    render() {

        let headerStyle = {
            padding:'24px 24px 20px 24px',
            display:'-webkit-flex',
            WebkitJustifyContent: 'space-between',
            justifyContent: 'space-between',
            borderBottom:'2px solid #d93600',
            position: 'relative'
        }

        return (
            <div style={headerStyle}>
                <HeaderTitle
                    backiconUrl="../image/backicon.png"
                    iconUrl= "../image/destinationicon.png"
                    title={this.state.title}
                    params={this.props.params}

                />
                {this.state.showSelectCity ? <SwitchCity onClick={this.onSwitchCityClick.bind(this)} onClose={this.onSwitchCityClose.bind(this)} /> : ''}
                <ChooseCity city={this.state.city} onClick={this.onLocationClick.bind(this)}/>
            </div>
        )
    }
}

class HeaderTitle extends Component {

    handleClick() {
        if(!this.props.params.cid) {
            window.location.href = '/'
            return
        }
        if(this.props.params.cid && this.props.params.tid ) {
            window.location.hash = ''
            return
        }
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
        let centerTitleStyle = {
            fontSize: '22px',
            color: '#D93600',
            verticalAlign:'middle',
            position: 'absolute',
            top: '55%',
            left: '50%',
            WebkitTransform: 'translate(-50%,-50%)'
        }

        return (
            <div>
                <span style={backStyle} onClick={this.handleClick.bind(this)}>
                    <img style={iconStyle} src={this.props.backiconUrl} />
                </span>
                {this.props.title == '目的地' ?
                    <span style={destinationiconStyle}>
                        <img style={iconStyle} src={this.props.iconUrl}  />
                    </span> : ''
                }
                <span style={this.props.title== '目的地'? titleStyle : centerTitleStyle }>
                    {this.props.title}
                </span>
            </div>
        )
    }
}

class ChooseCity extends Component {
    static get defaultProps() {
        return {
            city: '北京'
        }
    }

    constructor(props) {
        super(props)
    }

    render() {
        let imgStyle = {
            width:'100%',
            heihgt: '100%',
            verticalAlign:'middle'
        }

        let locationiconStyle={
            width:'16px',
            heihgt:'18px',
            display:'inline-block'
        }

        let locationStyle = {
            fontSize:'18px',
            color:'#484949',
            verticalAlign:'middle',
            paddingLeft:'15px'
        }

        return (
            <div onClick={this.props.onClick}>
                <span style={locationiconStyle}>
                    <img style={imgStyle} src="../image/locationicon.png" />
                </span>
                <span style={locationStyle}>{this.props.city}</span>
            </div>
        )
    }
}
