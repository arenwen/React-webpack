import React, { Component, PropTypes } from 'react'
import Image from './Image'
import { Link } from 'react-router'
import config from '../../commonConfig'

export default class SwitchCity extends Component {
    static get defaultProps() {
        return {
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            filter: '',
            cities: []
        }
    }

    componentDidMount() {
        fetch(config.FETCH_URL+'api/1/discovery/cities/')
            .then(response => response.json())
            .then(resp => this.setStateByCode(resp))
            .catch(e => console.log("Oops,error", e))
    }

    setStateByCode(resp) {
        if(resp.code != 0) {
            console.log("Oops,error", resp.message)
            return
        }

        let cities = []
        for (var key in resp.data.cities) {
            if (resp.data.cities.hasOwnProperty(key)) {
                cities = cities.concat(resp.data.cities[key]);
            }
        }

        this.setState({
            code: resp.code,
            cities: cities
        })
    }

    onInput(ev) {
        this.setState({
            filter: ev.target.value
        })
    }

    render() {
        let switchCityWrap = {
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,.5)',
            zIndex: '9',
            position: 'fixed',
            top:'0',
            left:'0'
        }
        let switchcityStyle = {
            position: 'absolute',
            width: '66%',
            top: '76px',
            left: '50%',
            WebkitTransform: 'translateX(-50%)',
            zIndex: 233,
            backgroundColor: '#fff'
        }

        let results = this.state.filter ? this.state.cities.filter(city => {
            return city.code.indexOf(this.state.filter) !== -1 ||
             city.name.indexOf(this.state.filter) !== -1
        }) : this.state.cities

        return (
            <div style={switchCityWrap}>
                <div style={switchcityStyle}>
                    <SwitchHeader onClose={this.props.onClose} />
                    <SearchBar onInput={this.onInput.bind(this)} />
                    <CityWrap cities={results} onClick={this.props.onClick} />
                </div>
            </div>

        )
    }
}

class SwitchHeader extends Component {
    render() {
        let switchHeaderStyle = {
            background: 'url(../image/dashedcut.png) repeat-x center bottom',
            backgroundSize: '150%',
            textAlign: 'center',
            lineHeight: '3',
            position: 'relative'
        }
        let switchTitleStyle = {
            color: '#d93600',
            fontSize: '22px',
            fontFamily: 'PingFang-SC-Medium'
        }
        let switchCloseStyle = {
            position: 'absolute',
            right: '10px',
            top: '-8px',
            color: '#999',
            fontSize: '26px'
        }
        return (
            <div style={switchHeaderStyle}>
                <p style={switchTitleStyle}>切换城市</p>
                <span style={switchCloseStyle} onClick={this.props.onClose}>×</span>
            </div>
        )
    }
}

class SearchBar extends Component {
    static get defaultProps() {
        return {
            onInput: function() {}
        }
    }

    componentDidMount() {
        this.refs.input.focus()
    }

    render() {
        let searchBarStyle = {
            position: 'relative',
            width: '85%',
            height: '44px',
            border: '1px solid #b5b5b5',
            margin: '15px auto'
        }
        let inputStyle = {
            width: '100%',
            height: '100%',
            fontSize:'18px',
            textAlign: 'center'
        }
        let searchIconStyle = {
            position:'absolute',
            width: '34px',
            height: '34px',
            top:'8px',
            left:'24%'
        }
        let imgStyle = {
            width: '100%'
        }

        return (
            <div style={searchBarStyle}>
                <input type="text" ref="input" onInput={this.props.onInput} style={inputStyle} placeholder="输入城市名或者拼音" />
                <div style={searchIconStyle}>
                    <img style={imgStyle} src="../image/searchicon.png" alt="" />
                </div>
            </div>
        )
    }
}

class CityWrap extends Component {
    static get defaultProps() {
        return {
            onClick: function () {}
        }
    }

    render() {
        let cityWrapStyle = {
            width: '85%',
            margin: '0 auto'
        }
        let cityWrap = []
        let lastAlphabet = null
        let cities = this.props.cities.sort((a, b) => a.code[0] > b.code[0] ? 1 : -1)

        cities.forEach(city => {
            let firstLetter = city.code[0]

            if(firstLetter !== lastAlphabet){
                cityWrap.push(<Alphabet alphabet={firstLetter } key={Math.random()}/>)
            }

            cityWrap.push(<AlphabetCity name={city.name} cid={city.id} onClick={this.props.onClick}/>)

            lastAlphabet = firstLetter
        })

        return (
            <div style={cityWrapStyle}>
                {cityWrap}
            </div>
        )
    }
}

class Alphabet extends Component {
    render() {
        let alphabetStyle = {
            fontSize: '18px',
            color: '#484949',
            lineHeight: '2',
            backgroundColor: '#eee',
            textIndent: '15px',
            margin: '0 auto'
        }
        return (
            <div style={alphabetStyle}>
                {this.props.alphabet}
            </div>
        )
    }
}
class AlphabetCity extends Component {
    static get defaultProps() {
        return {
            onClick: function () {}
        }
    }

    constructor(props) {
        super(props)
    }

    onClick(event) {
        window.store.title = this.props.name
        window.store.city = this.props.name

        this.props.onClick(event)
    }
    render() {
        let alphabetCityStyle = {
            fontSize: '18px',
            color: '#999',
            lineHeight: '3',
            textIndent: '15px',
            borderBottom: '1px solid #d0d0d0'
        }
        let LinkTo = `/city/${this.props.cid}/tab/foods/`
        return (

            <div style={alphabetCityStyle}>
                <Link to={LinkTo} onClick={this.onClick.bind(this)}>
                    <div>
                        {this.props.name}
                    </div>
                </Link>
            </div>
        )
    }
}
