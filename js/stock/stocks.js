import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import '../../less/stock/stock'
import { Link } from 'react-router'

class StockDetails extends Component {
    constructor(args) {
        super(args);
    }
    render(){
        let stock_id = this.props.stockid;
        return (
            <div className='stocks-details'>
                <iframe className="stockDeta" scrolling="no" src={'http://m.jrj.com.cn/share/pad/stock.shtml?stockcode='+stock_id}>
                </iframe>
            </div>
        )
    }
}
class StockHeader extends Component {
    constructor(args) {
        super(args);
        this.state = {

        };
    }
    search(){
        let ifShow = {
            flagIndex:false,
            stock_num:this.refs.stockNumber.value
        }
        this.props.showDetail(ifShow);
    }
    backfun(){
        let ifShow = {
            flagIndex:true,
        }
        this.refs.stockNumber.value = '';
        this.props.showDetail(ifShow);
    }
    render(){
        return (
            <div className="stock-header">
                <div className="stock-header-left" onClick={this.backfun.bind(this)}>
                    <img src='../image/backicon.png' />
                    <span>股票行情</span>
                </div>
                <div className="stock-header-right">
                    <div>
                        <input type="text" placeholder="请输入股票代码"  ref='stockNumber' />
                        <span className="search" onClick={this.search.bind(this)}>
                            <img src='../image/white_search.png' />
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
class MainStocks extends Component {
    constructor(args) {
        super(args)
    }
    render(){
        return (
            <div className='stocks-detail'>
                <iframe scrolling="no" src='http://m.jrj.com.cn/share/pad/index.shtml?indexcode=000001'>
                </iframe>
                <iframe scrolling="no" src='http://m.jrj.com.cn/share/pad/index.shtml?indexcode=399001'>
                </iframe>
            </div>
        )
    }
}
export default class Stock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flagIndex:true
        }
    }
    IfshowDetail(data){
        console.log(data);
        this.setState({
            flagIndex:data.flagIndex,
            stock_num:data.stock_num
        });
    }
    render(){
        let mai_data;
        let detail_data;
        if(this.state.flagIndex){
            mai_data = <MainStocks />;
            detail_data = '';
        }else{
            mai_data = '';
            detail_data = <StockDetails stockid={this.state.stock_num} />;
        }
        return (
            <div className='stocks'>
                <StockHeader showDetail = {this.IfshowDetail.bind(this)} />
                { mai_data }
                { detail_data }
            </div>
        )
    }
}
