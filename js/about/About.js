import React, { Component, PropTypes } from 'react'
require('../../less/about/about')
import NavigationBar from '../util/navigationBar'
import Header from './Header'
import AboutContainer from './AboutContainer'
import Footer from './Footer'
export default class About extends Component {
    componentDidMount(){
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
            <AboutContainer />
        )

        if (this.props.params.pid) {
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
                        <Header />
                        {container}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
