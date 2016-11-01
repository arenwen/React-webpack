import React, { Component } from 'react'
import RecommendTypeTab from './RecommendTypeTab'
import RecommendTypeList from './RecommendTypeList'
import config from '../../../commonConfig'
import Loading from '../../util/loading'
import fetch from 'isomorphic-fetch'

export default class CityContainer extends Component {
    static get defaultProps() {
        return {
        }
    }

    constructor() {
        super()
        this.state = {
            code: 1,
            data: [],
            ifLoading:true
        }
    }

    componentDidMount() {
        this.fetch(this.props.params.cid, this.props.params.tid)

    }

    fetch(cid, tid) {
        fetch(config.FETCH_URL+`api/1/discovery/${cid}/${tid}/`)
            .then(response => response.json())
            .then(json => this.setStateByCode(json))
            .catch(e => console.log("Oops,error", e))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: []
        })
        if(nextProps.params.tid){
            this.fetch(nextProps.params.cid, nextProps.params.tid)
        }
        if (!nextProps.params.aid && !nextProps.params.sid ) {
            window.store.title =  window.store.city
        }
    }

    setStateByCode(json) {
        if(json.code != 0) {
            return
        }

        let atlasList = {}

        json.data.forEach(city => {
            atlasList[city.id] = city
        })

        window.store.atlasList = atlasList

        this.setState({
            code: json.code,
            data: json.data,
            ifLoading:false
        })
    }

    render() {
        let linkPrefix = `/city/${this.props.params.cid}`
        let container = (
            <div>
                <Loading ifLoading={ this.state.ifLoading } />
                <RecommendTypeTab linkPrefix={linkPrefix} currentTab={this.props.params.tid}/>
                <RecommendTypeList cid={this.props.params.cid} tid={this.props.params.tid} data={this.state.data}/>
            </div>
        )

        if (this.props.params.aid) {
            container = (
                <div>
                    {this.props.children}
                </div>
            )
        }

        if (this.props.params.sid) {
            container = (
                <div>
                    {this.props.children}
                </div>
            )
        }
        // todo
console.log('children',this.props.children)
        return (
            <div>
                {container}
            </div>
        )
    }
}
