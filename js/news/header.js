import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'



export default class Header extends Component {
    constructor() {
        super()

        this.defaultDivCategorysHeight = null
        this._curCategory = null
    }

    handleMove(e) {
        e.preventDefault()
        let ulCategorys = this.refs.ul_categorys
        let divCategorys = this.refs.div_categorys
        if (this.defaultDivCategorysHeight == null) {
            this.defaultDivCategorysHeight = $(divCategorys).height()
        }

        let divCategorysHeight = $(divCategorys).height()
        let ulCategorysHeight = $(ulCategorys).height()

        if (divCategorysHeight < ulCategorysHeight) {
            $(divCategorys).animate({
                height: ulCategorysHeight
            }, 500)
        }
        else {
            $(divCategorys).animate({
                height: this.defaultDivCategorysHeight
            }, 500)
        }
    }

    render() {
        let selectedCategory = this.props.selectedCategory
        const categorys = this.props.categorys.map(function(data, i) {
            let linkTo = `/category/${data.cid}`
            let focusStyle = {}
            if (selectedCategory == data.cid) {
                focusStyle = {
                    color: '#D93600',
                    borderBottom: '2px solid #D93600'
                }
            }
            return <li key={data.cid}>
                        <Link to={linkTo}>
                            <span style={focusStyle}>
                                {data.name}
                            </span>
                        </Link>
                    </li>
        })

        return (
            <div className='header-container'>
                <div className='header-left'>
                    <span className='header-left-back'>
                        <a href='/'>
                            <img src='../image/backicon.png' />
                        </a>
                    </span>
                    <span className='header-left-icon'>
                        <img src='../image/icon_news.png'  />
                    </span>
                    <span className='header-left-name'>资讯头条</span>
                </div>
                <div className='header-right' ref='div_categorys'>
                    <ul ref='ul_categorys'>
                        {categorys}
                    </ul>
                </div>
                <div className='header-more'>
                    <span>
                        <img src='../image/news_more_r.png' onClick={this.handleMove.bind(this)} />
                    </span>
                </div>
            </div>
        )
    }
}
