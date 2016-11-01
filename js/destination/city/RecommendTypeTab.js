import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class RecommendTypeTab extends Component {

    static get defaultProps() {
        return {
            linkPrefix: '/city/0',
            currentTab: 'food',
            tabs: [
                {
                    tab: 'foods',
                    name: '好吃的',
                    imgUrl: '../image/des-navfood-g.png',
                    curImgUrl: '../image/des-navfood.png'
                },
                {
                    tab: 'sceneries',
                    name: '好玩的',
                    imgUrl: '../image/des-navscenic-g.png',
                    curImgUrl: '../image/des-navscenic.png'
                },
                {
                    tab: 'shopping',
                    name: '值得买',
                    imgUrl: '../image/des-navshopping-g.png',
                    curImgUrl: '../image/des-navshopping.png'
                }
            ]
        }
    }
    render() {
        let navWrapStyle = {
            width: '100%',
            display: '-webkit-flex',
            padding: '15px 0 10px 0',
            borderBottom:'1px solid #e1e0dc'
        }
        let navListStyle = {
            width: '100%'
        }
        let currentTab = this.props.currentTab
        let linkPrefix = this.props.linkPrefix

        const navs = this.props.tabs.map(function(tabItem, i) {
            let linkTo = `${linkPrefix}/tab/${tabItem.tab}`
            return (
                <li style={navListStyle} key={tabItem.tab}>
                    <Link to={linkTo} >
                        <NavItem
                            selected={tabItem.tab == currentTab}
                            imgUrl={tabItem.tab == currentTab ? tabItem.curImgUrl : tabItem.imgUrl}
                            navTitle={tabItem.name}
                        />
                    </Link>
                </li>
            )
        })

        return (
            <ul style={navWrapStyle}>
                {navs}
            </ul>
        )
    }
}

class NavItem extends Component {
    static get defaultProps() {
        return {
            selected: false
        }
    }

    render() {
        let contentStyle = {
            width:'120px',
            margin:'0 auto'
        }

        let imgStyle = {
            width:'28px',
            height:'28px',
            verticalAlign:'middle'
        }
        let wordStyle = {
            fontSize:'18px',
            color:this.props.selected? '#d93600' : '#5d5d5d',
            paddingLeft:'28px',
            verticalAlign:'middle'
        }
        let navItemStyle = {
            WebkitFlex:'1',
            borderLeft:'1px solid #d1d0ce'
        }
        let curNavItemStyle = {
            WebkitFlex:'1',
            borderLeft:'1px solid #d1d0ce'
        }

        let underLineStyle = {
            position: 'relative',
            width: '100%',
            height: '2px',
            backgroundColor: '#d93600',
            top:'10px'
        }

        return (
            <div  style={this.props.currentTabtype == this.propstabtype? curNavItemStyle : navItemStyle}>
                <div style={contentStyle}>
                    <img  style={imgStyle} src={this.props.imgUrl} />
                    <span style={wordStyle}>{this.props.navTitle}</span>
                </div>
                {this.props.selected ? <div style={underLineStyle}></div> : ''}
            </div>
        )
    }
}
