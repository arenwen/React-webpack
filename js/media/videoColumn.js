import { render } from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { Router,Route, hashHistory,Link} from 'react-router'
import '../../less/media/videocolumn'

export default class VideoColumn extends Component {
	constructor(args) {
		super(args);
	}
	render(){
		return (
			<div className="video-column">
				<span className={this.props.classnames}></span>
				<span>{this.props.message == undefined ? '人气新剧' : this.props.message}</span>
			</div>
		)
	}
}