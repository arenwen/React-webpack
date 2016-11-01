import React, { Component, PropTypes } from 'react'

export default class Image extends Component {
    static get defaultProps() {
        return {
            imgRatio: '56.25%'
        }
    }

    render() {
        let imgWrapStyle = {
            width: '100%',
            position: 'relative',
            paddingBottom: this.props.imgRatio
        }

        let imgStyle = {
            width:'100%',
            height: '100%',
            position: 'absolute',
            display:'block'
        }

        return (
            <div style={imgWrapStyle}>
                <img  style={imgStyle} src={this.props.imgSrc} />
                <ImgWord imgTitle={this.props.imgTitle} />
            </div>
        )
    }
}
class ImgWord extends Component {
    static get defaultProps() {
        return {
            imgTitle: ''
        }
    }
    render() {
        let imgTitleBoxStyle = {
            width:'100%',
            height: '30%',
            background:'linear-gradient(to top, rgba(0,0,0,.5) ,rgba(0,0,0,0))',
            position:'absolute',
            left:'0',
            bottom:'0',
            zIndex: '0'
        }
        let ImgTitleStyle = {
            color: '#fff',
            fontSize: '18px',
            lineHeight: '1.3',
            display: 'inline-block',
            padding: '8px 8px'
        }
        return (
            <div style={imgTitleBoxStyle}>
               <span style={ImgTitleStyle}>{this.props.imgTitle}</span>
            </div>
        )
    }
}
