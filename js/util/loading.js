import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
export default class Loading extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ifLoading:true
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            ifLoading:nextProps.ifLoading
        })
    }
    render(){
        return (
            <div className={this.state.ifLoading == true?'loader':'loader dn'}>
                <div className="loader-inner ball-spin-fade-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
}