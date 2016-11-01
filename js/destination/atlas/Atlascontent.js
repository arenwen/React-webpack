import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Image from '../Image'
import Slider from './Slider'

export class ImgsWrap extends Component {
    static get defaultProps() {
        return {
            images: [],
            onClick: function() {

            }
        }
    }

    render() {
        let imgItemWrap = {
            width:'32.83%',
            float:'left',
            padding:'.25%'
        }

        return (
            <ul>
                {this.props.images.map((image, i) => {
                    return (
                        <li style={imgItemWrap} data-index={i} onClick={this.props.onImgClick} key={Math.random()}>
                            <Image
                                imgRatio="100%"
                                imgSrc={image} />
                        </li>
                    )
                })}
            </ul>
        )
    }
}
export class SliderContainer extends Component {
    static get defaultProps() {
        return {
            start: 0,
            images: []
        }
    }

    constructor(props) {
        super(props)
    }

    render() {
        let imgCoverStyle = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, .8)',
            zIndex: '999',
            top: '0',
            left: '0'
        }
        let backStyle = {
            background: 'url(../image/leftarrow.png) no-repeat 3% center',
            backgroundSize:'26px',
            color: '#fff',
            fontSize: '18px',
            textIndent: '26px',
            padding:'3%'
        }
        return (
            <div style={imgCoverStyle} id="hide" >
                <div style={backStyle} onClick={this.props.onBackButtonClick}>返回</div>
                <Slider start={this.props.start} images={this.props.images}/>
            </div>
        )
    }
}
