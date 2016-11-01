import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import TimeAgo from 'react-timeago'
import Detail from './detail'


export default class Content extends Component {
    render() {
        const newsItems = this.props.newsByCate.map(data => {
            if (data.image_urls.length == 1) {
                return <ItemOneImg key={data.nid} news={data} cid={this.props.cid} />
            }
            return <ItemMultiImg key={data.nid} news={data} cid={this.props.cid} />
        })
        return (
            <div className='items'>
                {newsItems}
            </div>
        )
    }
}


class ItemMultiImg extends Component {
    render() {
        const data = this.props.news
        let t = new Date( data.publish_time )
        let imgs = data.image_urls.map((img, i)=> {
            if (i < 4) {
                return (
                        <li key={i}>
                            <img key={i} src={img.url} />
                        </li>
                    )
            }
        })
        return (
            <div className='item'>
                <Link to={`/detail/${data.nid}?cid=${this.props.cid}`}>
                    <div className='item-title'>
                        <span>{data.title}</span>
                    </div>
                    <div className='item-multi-img'>
                        <ul>{imgs}</ul>
                    </div>
                   <div className='item-src-time'>
                        <span>{data.src}</span>
                        <span><TimeAgo date={t} /></span>
                    </div>
                    <div className='item-abstract'>
                        <span>{data.abstract}</span>
                    </div>
                </Link>
            </div>
        )
    }
}


class ItemOneImg extends Component {
    render() {
        const data = this.props.news
        let t = new Date( data.publish_time )
        let img_url = data.image_urls[0].url
        return (
            <div className='item-one-img'>
                <Link to={`/detail/${data.nid}?cid=${this.props.cid}`}>
                <div className='item-one-img-left'>
                    <div className='item-title'>
                        <span>{data.title}</span>
                    </div>
                    <div className='item-src-time'>
                        <span>{data.src} / <TimeAgo date={t} /></span>
                    </div>
                    <div className='item-abstract'>
                        <span>{data.abstract}</span>
                    </div>
                </div>
                <div className='item-one-img-right'>
                    <img src={img_url} />
                </div>
                </Link>
            </div>
        )
    }
}
