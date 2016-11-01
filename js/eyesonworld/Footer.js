import React, { Component, PropTypes } from 'react'

// Footer——————
export default class Footer extends Component {
    render() {
        let wrapStyle = {
            paddingLeft:'80px',
            backgroundColor:'#000',
            marginTop: '-95px'
        }
        let titleStyle = {
            fontSize:'24px',
            color:'#fff',
            padding:'18px 0'
        }
        let stateStyle = {
            fontSize:'12px',
            color:'#fff',
            paddingBottom:'12px'
        }
        return (
        <div style={wrapStyle}>
            <div style={titleStyle}>风筝·云图联合出品</div>
            <div style={stateStyle}>互联网违法和不良信息举报方式 电话：010 826771035 邮箱：buliang@shenzhenair.com</div>
        </div>
        )
    }
}
