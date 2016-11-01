import React, { Component, PropTypes } from 'react'
require('../../less/destination/destination')
import { Link } from 'react-router'
import Image from './Image'
export default class LinkImg extends Component {
    static get defaultProps() {
        return {
            url: '/',
            onClick: function() {}
        }
    }

    render() {
        return (
            <Link to={this.props.url}>
                <Image
                    {...this.props}
                />
            </Link>
        )
    }
}
