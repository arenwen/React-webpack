import fetch from 'isomorphic-fetch'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import config from '../../commonConfig'
import Header from './header'
import Content from './content'
import Detail from './detail'
import Loading from '../util/loading'
import NavigationBar from '../util/navigationBar'
import '../../less/news/index'


class App extends Component {
    constructor() {
        super()

        this.state = {
            code: 1,
            data: []
        }
    }

    componentDidMount() {
        console.log('[app]  componentDidMount')
        let url = config.API_NEWS_CATEGORYS
        fetch(url).then(response => response.json())
          .then(json => this.setStateByCode(json))
          .catch(e => console.log('Oops, error', e))
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
                data: json.data.nav
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('[APP] componentWillReceiveProps nextProps', nextProps.params.cid)
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[APP] shouldComponentUpdate', nextProps.params.cid)
        if (this.state != nextState) {
            return true
        }

        if (this.props.params.cid == nextProps.params.cid) {
            return false
        }

        return true
    }

    render() {
        console.log('[APP] render', 'nid is', this.props.params.nid, 'cid is', this.props.params.cid)
        let ret = (
                    <div>
                      Loading.....
                    </div>
          )
        if (this.props.params.nid != undefined) {
            ret = (
                    <div>
                        {this.props.children}
                    </div>
              )
        }
        else {
            ret = (
                    <div>
                        <Header categorys={this.state.data} selectedCategory={this.props.params.cid} />
                        {this.props.children}
                    </div>
            )
        }

        return ret
    }
}


class NewsList extends Component {
    constructor() {
        console.log('[NewsList] constructor')
        super()
        this.state = {
            code: 1,
            data: [],
            ifLoading: true
        }
    }

    fetchMore() {
        console.log('[NewsList] fetchMore')
        if($(document).scrollTop() >= $(document).height() - $(window).height()) {
            let i = this.state.data.length - 1
            let data = this.state.data[i]
            if (data)
                this.fetchByCategory(this.props.params.cid, config.PAGE_SIZE, data.nid)
        }
    }

    componentDidMount() {
        console.log('[NewsList] componentDidMount', this.props.params.cid)
        this.fetchByCategory(this.props.params.cid)
    }

    componentWillUnmount() {
        console.log('[NewsList] componentWillUnmount')
    }

    componentWillReceiveProps(nextProps) {
        console.log('[NewsList] componentWillReceiveProps', nextProps.params.cid)
        if (nextProps.params.cid != this.props.params.cid) {
            this.fetchByCategory(nextProps.params.cid)
        }
    }

    fetchByCategory(category, pageSize=config.PAGE_SIZE, startIndex=0) {
        let url = `${config.API_NEWS}?cid=${category}&page_size=${pageSize}&start_index=${startIndex}`
        fetch(url).then(response => response.json())
            .then(json => this.setStateByCode(json))
            .catch(e => {
                console.log('Oops, error', e)
                this.setState({
                    ifLoading: false
                })
            })
    }

    setStateByCode(json) {
        if (json.code == 0) {
            let data = this.state.data
            if (data.length == 0 || data[0].cid != json.data[0].cid) {
                data = json.data
            }
            else {
                data = data.concat(json.data)
            }
            this.setState({
                code: json.code,
                data: data,
                ifLoading: false
            })
        }
        else {
            console.log('Oops, error', json.code, json.message)
        }
    }

    render() {
        console.log('[NewsList] render', this.state.data)
        return (
            <div>
                <NavigationBar srollCallback={ this.fetchMore.bind(this) } />
                <Loading ifLoading={ this.state.ifLoading } />
                <Content newsByCate={ this.state.data } cid={ this.props.params.cid } />
            </div>
        )
    }
}


class DetailIndex extends Component {
    constructor() {
        super()

        this.state = {
            code: 1,
            data: [],
            ifLoading: true
        }
    }

    fetchByNewsId(cid, nid) {
        let url = `${config.API_NEWS_DETAIL}${cid}/${nid}/`
        fetch(url).then(response => response.json())
          .then(json => this.setStateByCode(json))
          .catch(e => {
            console.log('Oops, error', e)
            this.setState({
                ifLoading: false
            })
          })
    }

    setStateByCode(json) {
        console.log('[Detail] setStateByCode')
        if (json.code != 0) {
            // # TODO
            console.log('Oops, error', json.message)
            this.setState({
                ifLoading: false
            })
        }
        else {
            this.setState({
                code: json.code,
                data: json.data,
                ifLoading: false
            })
        }
    }

    componentDidMount() {
        console.log('[Detail] componentDidMount', this.props)
        this.fetchByNewsId(this.props.location.query.cid, this.props.params.nid)
    }

    render() {
        console.log('[Detail] render', this.props.params.nid)
        return (
                <div>
                    <NavigationBar />
                    <Loading ifLoading={ this.state.ifLoading } />
                    <Detail detailInfo={ this.state.data } cid={ this.props.location.query.cid } />
                </div>
            )
    }
}


export { App, NewsList, DetailIndex }
