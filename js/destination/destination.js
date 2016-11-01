import React, { Component, PropTypes } from 'react'
require('../../less/destination/destination')
import HomeContainer from './home/HomeContainer'
import Footer from './Footer'
import Header from './Header'
import NavigationBar from '../util/navigationBar'

export default class Destionation extends Component {
    constructor() {
        super()
        this.state = {
            code: 1,
            data: {},
            selectCity: false,
            prev: '/',
            now: '/'
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.params.cid) {
            window.store.title = '目的地'
        }
    }

    render() {
        let allStyle = {
            height: '100%'
        }
        let wrapperStyle = {
            minHeight: '100%'
        }
        let mainStyle = {
            paddingBottom: '82px'
        }
        let container = (
            <div>
                <HomeContainer />
            </div>
        )

        if (this.props.params.cid) {
            container = (
                <div>
                    {this.props.children}
                </div>
            )
        }

        return (
            <div style={allStyle}>
                <div style={wrapperStyle}>
                    <div style={mainStyle}>
                        <NavigationBar />
                        <Header params={this.props.params} />
                        {container}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
