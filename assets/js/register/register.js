'use strict';
const React = require('react');
require('../../css/register');
import { Router,Route,Link,browserHistory} from 'react-router'
const $ = require('jquery');
const MarkIcon = React.createClass({
    render:function(){
        return (
            <div className="titleImage">
                <span className="textMessage">{this.props.content}</span>
            </div>
        );
    }
});
const InputKuang = React.createClass({
    getInitialState:function(){
        return {

        };
    },
    render:function(){
        return (
            <div>
                <input placeholder={this.props.place} type={this.props._type}  className={this.props._className} />
                <ErrorMessage errormessage={this.props.errormessage} />
            </div>
        );
    }
});
const ErrorMessage = React.createClass({
    render:function(){
        return (
            <div className="error-message dn">{this.props.errormessage}</div>
        );
    }
});
const SecurityCode = React.createClass({
    render:function(){
        return (
            <div className="ver-code">
                <input placeholder="请输入6位验证码" type='text' />
                <div>获取验证码</div>
            </div>
        );
    }
});
const RegisterBtn = React.createClass({
    sbmit:function(){
        if($(".tel").val().length !=11 ){
            $(".tel").next().removeClass('dn');

        }else{
            window.location.href="#mydata";
        }
    },
    render:function(){
        return (
            <button className={this.props.btn_style} onClick={() => this.sbmit()}>
                {this.props.content}
            </button>
        );
    }
});
const Register = React.createClass({
    render:function(){
        return (
            <div className="wrapper">
                <MarkIcon content="手机号码" />
                <InputKuang place="请输入您的手机号" _type="number" _className="tel"  errormessage="手机号错误"/>
                <MarkIcon content="验证码" />
                <SecurityCode  />
                <MarkIcon content="设置口令" />
                <InputKuang place="请输入6-16位数字、字母组成的密码" _type="password"  _className="pwd"  errormessage="密码不符合规则"/>
                <MarkIcon content="确认口令" />
                <InputKuang place="请再次输入密码" _type="password" _className="repeatpwd" errormessage="两次输入的密码不一致"/>
                <RegisterBtn content="注册" btn_style="register-btn" />
            </div>
        );
    }
});
module.exports = Register;