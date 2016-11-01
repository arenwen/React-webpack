import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


export default class Detail extends Component {
    render() {
        const data = this.props.detailInfo
        let h = {__html: data.content}
        let t = new Date( data.publish_time )
        let formatted = `${t.getFullYear()}-${t.getMonth()}-${t.getDay()}`
        return (
            <div className='detail'>
                <div className='detail-left'>
                    <Link to={`/category/${this.props.cid}`}>
                        <span><img src="../image/news_detail_back.png" /></span>
                    </Link>
                </div>
                <div className='detail-center'>
                    <div className='detail-top'>
                        <span>{data.src}</span>
                        <span>{formatted}</span>
                    </div>
                    <div className='detail-title'>
                        <span>{data.title}</span>
                    </div>
                    <div className='detail-content'>
                        <div dangerouslySetInnerHTML={h} />
                    </div>
                    <div className='detail-readermore'>

                    </div>
                </div>
                <div className='detail-right'>
                </div>
            </div>
        )
    }
}
