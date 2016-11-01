import React, { Component, PropTypes } from 'react'
require('../../less/about/about')
import NavigationBar from '../util/navigationBar'
import Header from './Header'
import Image from './Image'
import config from '../../commonConfig'
import { Link } from 'react-router'

export default  class AboutContainer  extends Component {
    render() {
        let AboutContainerStyle = {
            background: 'url(../image/aboutbanner.png) no-repeat ',
            backgroundSize: '100% auto',
            paddingTop: '200px'
        }
        return (
            <div style={AboutContainerStyle}>
                <ContentContainer />
            </div>
        )
    }
}
class ContentContainer  extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: 1,
            data: []
        }
    }

    componentDidMount() {
        fetch(config.FETCH_URL+'api/1/about/')
            .then(response => response.json())
            .then(json => this.setStateByCode(json))
            .catch(e => console.log('Oops,error', e))

    }

    setStateByCode(json) {
        if(json.code != 0) {
            return
        }

        this.setState({
            code: json.code,
            data: json.data
        })
    }
    render() {
        let containerStyle = {
            width: '75%',
            margin: '0 auto',
            background: '#fff',
            padding:'7%'
        }
        return (
            <div style={containerStyle}>
                <Advocate />
                <Introduction introInfo={this.state.data.introduction}/>
                <FeaturedProducts products={this.state.data.procucts}/>
            </div>
        )
    }
}

class Title  extends Component {
    render() {
        let titleStyle = {
            paddingLeft: '11px',
            borderLeft: '10px solid #010101',
            margin: '30px 0'
        }
        let wordStyle = {
            fontSize: '18px',
            fontWeight: 'bold'
        }
        return (
            <div style = {titleStyle}>
                <div style={wordStyle}>{this.props.EWord}</div>
                <div style={wordStyle}>{this.props.CWord}</div>
            </div>
        )
    }
}
class Advocate extends Component {
    render() {
        let contentStyle = {
            display: '-webkit-flex'
        }
        let imgWrapStyle = {
            WebkitFlex: '1',
            background: 'url(../image/szlogo.png) no-repeat center center',
            backgroundSize: '80%'
        }
        let wordWrapStyle = {
            WebkitFlex: '1',
            borderLeft: '1px solid #979797',
            padding: '0 5%',
            textAlign: 'center'
        }
        let eWordStyle = {
            fontSize: '50px',
            borderBottom: '1px solid #979797'
        }
        let cWordStyle = {
            fontSize: '32px',
            lineHeight: '1.8',
            borderBottom: '1px solid #979797'
        }
        return (
            <div>
                <Title EWord='ADVOCATE' CWord='服务宗旨' />
                <div style={contentStyle}>
                    <div style={imgWrapStyle}></div>
                    <div style={wordWrapStyle}>
                        <div style={eWordStyle}>
                            <p>AT ANY</p>
                            <p>ANYTIME</p>
                        </div>
                        <p style={cWordStyle}>任何时候 体贴自然</p>
                    </div>
                </div>
            </div>
        )
    }
}

class Introduction extends Component {
    render() {

        let introStyle = {
            color: '#484949',
            lineHeight: '1.4',
            borderBottom: '1px dashed #c9c8c8'
        }
        let introInfo = {__html: this.props.introInfo}
        return (
            <div style={introStyle}>
                <Title EWord='INTRODUCTION' CWord='深航简介' />
                <div className='pwrap'>
                    <div dangerouslySetInnerHTML={introInfo} />
                </div>
            </div>
        )
    }
}

class FeaturedProducts extends Component {
    static get defaultProps() {
        return {
            imgRatio: '56.09%',
            products: []
        }
    }

    render() {
        let contentWrapStyle = {
            overflow: 'hidden'
        }
        let itemWrapStyle = {
            width: '30%',
            padding: '1.6%',
            float: 'left',
            fontSize: '16px',
            color: '#5d5d5d',
            textAlign: 'center',
            lineHeight: '3'
        }
        console.log('pppp',this.props.products)
        let products =this.props.products.map((product,i) => {
            let url = `about/${product.id}`
            return (
                <div  style={itemWrapStyle} key={i}>
                    <Link to={url}>
                        <Image imgRatio={this.props.imgRatio} imgSrc={product.cover_image}/>
                        <p>{product.title}</p>
                    </Link>
                </div>

            )
        }
        )
        return (
            <div>
                <Title EWord='INTRODUCTION' CWord='特色产品' />
                <div>
                    <div style={contentWrapStyle}>
                        {products}
                    </div>
                </div>
            </div>
        )
    }
}
