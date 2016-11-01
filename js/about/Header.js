import React, { Component, PropTypes } from 'react'

// Header——————
export default class Header extends Component {
	render() {
		let headerStyle = {
			padding:'24px 24px 20px 24px',
			display:'-webkit-flex',
			WebkitJustifyContent: 'space-between',
			justifyContent: 'space-between',
			borderBottom:'2px solid #d93600'
		}
		return (
			<div style={headerStyle}>
				<HeaderTitle backiconUrl="../image/backicon.png"
		             iconUrl="../image/aboutshenhangicon.png"
					 headerTitle="深航专区"
				/>
			</div>
		)
	}
}

class HeaderTitle extends Component {

    handleClick() {
        window.history.go(-1)
    }

    render() {

        let backStyle = {
            width: '20px',
            height: '30px',
            display: 'inline-block'
        }
        let iconStyle = {
            width: '100%',
            height: '100%',
            verticalAlign:'middle'
        }
        let destinationiconStyle = {
            width:'38px',
            height: '38px',
            display: 'inline-block',
            margin:'0 18px'
        }
        let titleStyle = {
            fontSize: '22px',
            color: '#D93600',
            verticalAlign:'middle'
        }
    return (
			<div>
				<span style={backStyle} onClick={this.handleClick}>
					<img style={iconStyle} src={this.props.backiconUrl} />
				</span>
				<span style={destinationiconStyle}>
					<img style={iconStyle} src={this.props.iconUrl}  />
				</span>

				<span style={titleStyle}>{this.props.headerTitle}</span>
			</div>
		)
	}
}
