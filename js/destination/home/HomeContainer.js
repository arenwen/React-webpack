import React, { Component, PropTypes } from 'react'
import FocusContainer from './FocusContainer'
import CityRecommend from './CityRecommend'


export default class HomeContainer extends Component {
    constructor() {
        super()
        this.state = {
            code: 1,
            data: []
        }
    }

    static get defaultProps() {
        return {

        }
    }

    render() {
        return (
            <div>
                <FocusContainer  focusInfo={this.props.focusInfo}/>
                <CityRecommend />
            </div>
        )
    }
}
