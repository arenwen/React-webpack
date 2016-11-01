import React, { Component, PropTypes } from 'react'
require('../../less/about/about')
import Header from './Header'
import Image from './Image'
import fetch from 'isomorphic-fetch'
import config from '../../commonConfig'

export default class Products extends Component {
    constructor() {
        super()
        this.state = {
            code: 1,
            data: {
                content: ''
            }
        }
    }

    componentDidMount() {
        fetch(config.FETCH_URL+`api/1/about/product/?pid=${this.props.params.pid}`)
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
            data: json.data
        })
    }

    render() {
        let imgWrapStyle = {
            width: '100%'
        }
        let imgInfo= {__html: this.state.data.content}
        return (
            <div style = {imgWrapStyle}>
                <p dangerouslySetInnerHTML={imgInfo} />
            </div>
        )
    }
}
