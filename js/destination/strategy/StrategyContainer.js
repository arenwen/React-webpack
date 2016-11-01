import React, { Component, PropTypes } from 'react'
import config from '../../../commonConfig'
import fetch from 'isomorphic-fetch'


export default class StrategyContainer extends Component {
    static get defaultProps() {
        return {
            cid: 1,
            sid: 1
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            code: 1,
            data: [],
            image_urls:[]
        }
    }
    componentDidMount() {
        fetch(config.FETCH_URL+`api/1/discovery/${this.props.cid}/strategies/${this.props.sid}/`)
            .then(response => response.json())
            .then(json => this.setStateByCode(json))
            .catch(e => console.log('Oops,error', e))
    }
    setStateByCode(json) {
        if(json.code != 0) {
            return
        }

        window.store.title =  json.data.title
        this.setState({
            code: json.code,
            data: json.data,
            image_urls:json.data.image_urls
        })
    }

    render() {
        let mainStyle={
            width: '96%',
            padding: '20px 0',
            margin: '0 auto'
        }
        let sourceStyle = {
            fontSize: '14px',
            color:'#999',
            textAlign: 'center',
            padding:'20px 0 30px 0'
        }
        let forewordWrap = {
            color: '#484949',
            backgroundImage: 'url(../image/dashedcut.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: '90%',
            backgroundColor:'#fff'
        }
        let forewordFix = {
            fontSize: '22px',
            paddingLeft: '15px'
        }
        let forewordContent = {
            fontSize: '14px',
            lineHeight: '3',
            background: '#fff',
            padding: '0 10px',
            zIndex: '999'
        }
        let articleStyle = {
            fontSize: '16px',
            color: '#484949',
            textIndent: '20px'
        }
        let imgWrapStyle = {
            textAlign: 'center',
            margin: '25px 0'
        }
        let timeStyle = {
            textIndent: '6px',
            display: 'inline-block'
        }
        const images = this.state.image_urls.map((img, i) => {
            return (
                <img src={img} key={i} />
                )
        })

        return (
            <div style={mainStyle}>
                <p style={sourceStyle}>
                    <span>{this.state.data.author}</span>
                    <span style={timeStyle}>{this.state.data.create_time}</span>

                </p>
                <div style={forewordWrap}>
                    <span style={forewordFix}>前言</span>
                    <span style={forewordContent}>{this.state.data.abstract}</span>
                </div>
                <div style={imgWrapStyle}>
                    {images}
                </div>
                <p style={articleStyle}>{this.state.data.content}</p>
            </div>
        )
    }
}
