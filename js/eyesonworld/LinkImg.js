import React, { Component, PropTypes } from 'react'
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
            <div>
                <Link to={this.props.url}>
                    <Image
                        {...this.props}
                    />
                </Link>
            </div>
        )
    }
}
