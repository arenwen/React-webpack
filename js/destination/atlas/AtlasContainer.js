import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {findDOMNode} from 'react-dom'
import { Link } from 'react-router'
import {ImgsWrap, SliderContainer} from './AtlasContent'


export default class AtlasContainer extends Component {
    static get defaultProps() {
        return {

        }
    }

    constructor(props) {
        super(props)

        this.state = {
            showSlider: false,
            sliderStart: 1,
            images: []
        }
    }

    componentDidMount() {
        let atlas = window.store.atlasList[this.props.params.aid]

        window.store.title = atlas.title
        this.setState({
            images: atlas.image_urls
        })
    }

    removeSlider() {
        this.setState({showSlider: false})
    }

    showSlider(ev) {
        this.setState({
            showSlider: true,
            sliderStart: +ev.currentTarget.dataset.index
        })
    }

    render() {
        let mainStyle={
            padding:'1%',
            overflow: 'hidden'
        }
        let linkPrefix = `/atlas/${this.props.params.aid}`
        let slider = this.state.showSlider ?
         <SliderContainer start={this.state.sliderStart} images={this.state.images} onBackButtonClick={this.removeSlider.bind(this)} /> : ''

        return (
            <div style={mainStyle}>
                <ImgsWrap images={this.state.images} linkPrefix={linkPrefix} onImgClick={this.showSlider.bind(this)} />
                {slider}
            </div>
        )
    }
}
