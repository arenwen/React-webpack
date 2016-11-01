import fetch from 'isomorphic-fetch'
import React, { Component } from 'react'
import config from '../../commonConfig'
import Select, { Option } from 'rc-select'
import 'rc-select/assets/index.css'


export default class App extends Component {

    constructor() {
        super()
        this.state = {
            code: 1,
            data: null,
            status: 0   // 0 接机  1 送机
        }
    }

    get destUrl() {
        if (this.state.data.carzone.shenzhenair.find(d => d.code === this.state.data.depAirport)) {
            return config.PICKUP_SH
        }

        return config.PICKUP_CARCAR
    }

    setStateByCode(json) {
        console.log('[APP] setStateByCode')
        if (json.code != 0) {
            // # TODO
            console.log('Oops, error', json.message)
        }
        else {
            this.setState({
                code: json.code,
                data: json.data,
                status: 0
            })
        }
    }

    componentDidMount() {
        console.log('[app]  componentDidMount')
        fetch(config.API_AIRPORT_PICKUP).then(response => response.json())
          .then(json => this.setStateByCode(json))
          .catch(e => console.log('Oops, error', e))
    }

    setStatus(val) {
        const s = this.state
        s.status = val
        this.setState(s)
    }

    render() {
        let divStyle = {
            width: '100%',
            margin: '0 auto'
        }
        let iframeStyle = {
            height: 600,
            minWidth: '100%',
            border: 0
        }
        return (
            <div>
                <Header setStatus={ this.setStatus.bind(this) } />
                {this.state.status == 1 ?
                    <SendAirport />:
                    <div style={divStyle}>
                    {
                        this.state.data &&
                        <iframe style={iframeStyle} scrolling='yes' src={ this.destUrl } >
                        </iframe>
                    }
                    </div>
                }
            </div>
        )
    }
}


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedVal: 0
        }
    }

    onChange(e) {
        let val
        if (e && e.target) {
            val = e.target.value
        }
        else {
            val = e
        }

        this.setState({
            selectedVal: val
        })

        this.props.setStatus(val)
    }

    render() {
        let headerStyle = {
            padding:'24px 24px 20px 24px',
            display:'-webkit-flex',
            WebkitJustifyContent: 'space-between',
            justifyContent: 'space-between',
            borderBottom:'2px solid #d93600'
        }
        let iconStyle = {
            width: '50%',
            height: '50%',
            verticalAlign:'middle'
        }
        const imgs = [
            <img src='../image/airport_pickup.png' style={iconStyle} />,
            <img src='../image/airport_send.png' style={iconStyle} />
        ]
        return (
            <div style={headerStyle}>
                <HeaderTitle backiconUrl="../image/backicon.png"
                             iconUrl="../image/airport_pickup_icon.png"
                             headerTitle="接送机"
                />

               <div style={{ margin: '0 auto', width: 300 }}>
                   <Select showSearch={false} onChange={this.onChange.bind(this)}
                                style={{ width: 120 }} value={imgs[this.state.selectedVal]}>
                     <Option value='0'>{imgs[0]}</Option>
                     <Option value='1'>{imgs[1]}</Option>
                   </Select>
               </div>
            </div>
        )
    }
}


class HeaderTitle extends Component {

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
            height: '28px',
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
                <span style={backStyle}>
                    <a href='/'>
                        <img style={iconStyle} src={this.props.backiconUrl} />
                    </a>
                </span>
                <span style={destinationiconStyle}>
                    <img style={iconStyle} src={this.props.iconUrl}  />
                </span>

                <span style={titleStyle}>{this.props.headerTitle}</span>
            </div>
        )
    }
}


class SendAirport extends Component {

    render() {
        return (
            <div>
                <img src='../image/airport_send_preview.png' />
            </div>
        )
    }
}


export { SendAirport }
