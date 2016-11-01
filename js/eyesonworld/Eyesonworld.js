import React, { Component, PropTypes } from 'react'
require('../../less/eyesonworld/eyesonworld')
import NavigationBar from '../util/navigationBar'
import Header from './Header'
import EyesContainer from './home/EyesContainer'
import Footer from './Footer'
import EyesDetail from './detail/EyesDetail'
export default class Eyesonworld extends Component {
    constructor() {
        super()
        this.state = {
            headerTitle:'丽眼看世界'
        }
    }
    componentDidMount(){
    }
    headerTitle(title){
        this.setState({
            headerTitle: title
        })
    }
    render() {
        let allStyle = {
            height: '100%'
        }
        let wrapperStyle = {
            minHeight: '100%',
            backgroundColor: '#f3f2f0'
        }
        let mainStyle = {
            paddingBottom: '82px'
        }
        let container = (
            <EyesContainer headerTitle={this.headerTitle.bind(this)}/>
        )
        if (this.props.params.cid) {
            container = (
                <div>
                    <EyesDetail cid={this.props.params.cid} headerTitle={this.headerTitle.bind(this)}/>
                </div>
            )
        }
        return (
            <div style={allStyle}>
                <div style={wrapperStyle}>
                    <div style={mainStyle}>
                        <Header headerTitle={this.state.headerTitle}/>
                        {container}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
