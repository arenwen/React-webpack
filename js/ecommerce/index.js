import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import config from '../../commonConfig'

export default class App extends Component {

    render() {
        return (
            <div>
                <Header />
                {this.props.children ?
                    this.props.children:
                    <Yimi />
                }
            </div>
        )
    }
}


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showSelectCity: false
        }
    }

    onLocationClick() {
        this.setState({
            showSelectCity: true
        })
    }

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
                             iconUrl="../image/ecommerce_icon.png"
                             headerTitle="空中电商"
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


export class Yimi extends Component {
    render() {
        let divStyle = {
            width: '100%',
            margin: '0 auto'
        }
        let iframeStyle = {
            height: 1000,
            minWidth: '100%',
            border: 0
        }
        return (
                <div style={divStyle}>
                    <iframe style={iframeStyle} scrolling='no' src={config.ECOMMERCE} >
                    </iframe>
                </div>
        )
    }
}
