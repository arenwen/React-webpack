import React, { Component, PropTypes } from 'react'
import config from '../../commonConfig'
import '../../less/common'


export default class PushMessage extends Component {
    constructor() {
        super()
        this._client = require('./mqttws31')
    }

    getPushMessage(env_id) {
        const height = 'cic/flight/status/height'
        const speed = 'cic/flight/status/speed'
        const latlong = 'cic/flight/status/latlong'
        const three_g = 'cic/flight/status/3g'
        const wow = 'cic/flight/status/wow'
        const pa = 'cic/flight/pa'
        const ku = 'cic/flight/ku'
        const topic = 'cic/topic'
        const activity = 'cic/flight/status/activity'

        // called when the this._client connects
        function onConnect() {
            // Once a connection has been made, make a subscription and send a message.
            //console.log('onConnect')
            this._client.subscribe('hello')
            this._client.subscribe(height,{qos:0})
            this._client.subscribe(speed,{qos:0})
            this._client.subscribe(latlong,{qos:0})
            this._client.subscribe(three_g,{qos:0})
            this._client.subscribe(wow,{qos:2})
            this._client.subscribe(pa,{qos:2})
            this._client.subscribe(ku,{qos:2})
            this._client.subscribe(topic,{qos:0})
            this._client.subscribe(activity,{qos:1})
        }
        // called when the this._client loses its connection
        function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log('onConnectionLost:'+responseObject.errorMessage)
                //this._client.connect({onSuccess:onConnect})
            }
        }
        // called when a message arrives
        function onMessageArrived(message) {
            console.log(message)
            //alert(message.destinationName)
            //alert('playloadString='+message.payloadString)
            if(message.destinationName == 'cic/topic'){
                var flag = (locationStorages.getItem('currentItem') == 'content_six')? true:false
                if(!flag){
                    $('.newmessages').removeClass('dn')
                }
            }
            if(message.destinationName == 'cic/flight/pa'){
                var showpamessage = (message.payloadString == '1')?true:false
                if(showpamessage){
                    $('.pazhezaoceng').removeClass('dn')
                }else{
                    $('.pazhezaoceng').addClass('dn')
                }
            }

        }
        //kiteapp.cicaero.com configs.currentHostName
        if(env_id == 1) {
            this._client = new window.Paho.MQTT.this._client(config.PA_HOST, config.PA_PORT, new Date().getTime())
            this._client.onConnectionLost = onConnectionLost
            this._client.onMessageArrived = onMessageArrived
            // connect the this._client
            this._client.connect({onSuccess:onConnect})
        }
    }

    render() {
        return (
            <div className='pazhezaoceng dn'>
                <img src='../../image/pacut.png' />
            </div>
        )
    }
}
