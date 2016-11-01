import React, { Component, PropTypes } from 'react'
import Image from '../Image'
import ReactSwipe from 'react-swipe'

export default class Slider extends Component {
    static get defaultProps() {
        return {
            start: 0,
            images: []
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            curIndex: this.props.start
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('next',nextProps);
    }

    onSlider(index) {
        this.setState({
            curIndex: index
        })
    }
    next() {
        this.refs.reactSwipe.next()
    }

    prev() {
        this.refs.reactSwipe.prev()
    }
    render() {

        let sliderStyle = {
            width: '100%',
            height: '100%'
        }
        let swipeOptions = {
            continuous: true,
            startSlide: this.state.curIndex,
            callback: this.onSlider.bind(this)
        }
        let imgWrapStyle = {
            width: '80%',
            position: 'absolute',
            left:'50%',
            top: '50%',
            WebkitTransform: 'translate(-50%,-50%)'
        }
        // arrow style
        let arrowWrap = {
            width: '100%',
            position: 'absolute',
            top: '50%',
            transform:'translateY(-50%)'
        }
        let arrowLeft = {
            position: 'absolute',
            left: '10px',
            width: '80px',
            height: '80px',
            background: 'url(../image/leftarrow.png) no-repeat center center',
            backgroundSize: '70%'
        }
        let arrowRight = {
            position: 'absolute',
            right: '10px',
            width: '80px',
            height: '80px',
            background: 'url(../image/rightarrow.png) no-repeat center center',
            backgroundSize: '70%'
        }


        let images = this.props.images.map((image,i) => {
            return (
                <div key={i}>
                    <Image imgRatio="100%" imgSrc={image} key={i} />
                </div>
            )
        })

        return (
            <div  style={sliderStyle}>
                <div style={imgWrapStyle}>
                    <ReactSwipe ref="reactSwipe" className="carousel" swipeOptions={swipeOptions}  key={this.props.images.length}>
                        {images}
                    </ReactSwipe>
                </div>

                <div style={arrowWrap}>
                    <div style={arrowLeft} data-type="LEFT" onClick={this.prev.bind(this)}>
                    </div>
                    <div style={arrowRight} data-type="RIGHT" onClick={this.next.bind(this)}>
                    </div>
                </div>

                <SliderIndex curIndex={this.state.curIndex + 1} allNum={this.props.images.length}/>
            </div>
        )
    }
}

class SliderIndex extends Component {
    static get defaultProps() {
        return {
            curIndex: 0,
            allNum: 0
        }
    }

    render() {
        let indexWrap = {
            position: 'absolute',
            bottom: '70px',
            color: '#fff',
            left: '50%',
            transform: 'translateX(-50%)'
        }
        return (
            <div style={indexWrap}>
                {this.props.curIndex} / {this.props.allNum}
            </div>
        )
    }
}
