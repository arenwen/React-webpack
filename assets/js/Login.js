
'use strict';

import React from 'react'
import { render } from 'react-dom'
import { Router,Route,Link,browserHistory} from 'react-router'

const Register = require('./register/register.js');
const $ = require('jquery');
require('../css/index.less');
const MarkIcon = React.createClass({

    render:function(){
        return (
            <div className="titleImage">
                <span className="textMessage">{this.props.content}</span>
            </div>
        );
    }
});
const Login = React.createClass({
    register:function(){
        //fetch('http://api.kitefans.com/api/1/game/network_status/')
        //console.log($);
        console.log(config);
        window.location.href = './register/registerEntry.js';
    },
    login:function(){
        let postDatas = {
            "phone":$(".tel").val(),
            "password":$(".pwd").val()
        };
        $.ajax({
            type:'POST',
            dataType:'json',
            url:config.fetch_url+'/api/1/user/login/',
            contentType: "application/json",
            data:JSON.stringify(postDatas),
            success:function(suc){
                console.log(suc);
            }.bind(this),
            error:function(xhr,status,err){
                console.error(config.fetch_url+"/api/1/user/login/",status,err.toString());
            }.bind(this)
        });
    },
    forgetPwd:function(){

    },
    render:function(){
        return (
            <div className="wrapper">
                <section>
                    <MarkIcon content="手机号" />
                    <input placeholder="请大人您输入手机号码" type="number" className="tel" />
                </section>
                <section>
                    <MarkIcon content="风筝口令" />
                    <input placeholder="请大人您在风筝的密码" type="password" className="pwd"/>
                </section>
                <section>
                    <button className="loginBtn" onClick={this.login}>登录</button>
                    <div className="login-problem">
                        <span>
                            <label>还没有账号？</label>
                            <label><Link to="register">立即注册</Link></label>
                        </span>
                        <span onClick={this.forgetPwd}><Link to="findpwd" className="forgetpwd">忘记密码？</Link></span>
                    </div>
                </section>
                <div className="login-indroduce">
                    风筝，不只是儿时爷爷手里长长的线， 更是家人无论在何时对您的丝丝惦念
                </div>
                <div className="login-end">
                    <div></div>
                    <div>风筝希望能为您的出行，提供家人般的贴心服务， 敬请您的关注！</div>
                </div>
            </div>
        );
    }
});

// render((
//     <Router history={browserHistory}>
//         <Route path="/" component={Login}>
//         </Route>
//         <Route path="register" component={Register} />
//     </Router>
// ), document.getElementById('contain'));
module.exports = Login;