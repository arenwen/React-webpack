import React, { Component, PropTypes } from 'react'

export default class Image extends Component {
    static get defaultProps() {
        return {
            imgRatio: '56.25%',
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
            </div>
        )
    }
}
