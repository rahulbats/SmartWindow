import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Slider, Switch, ActivityIndicator } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../../stylesheet/styles';
import smartStore  from "../../../stores/details/smart/smart-store";
import detailsStore from '../../../stores/details/details-store';
import initStore from '../../../stores/tsinit/tsinit-store';
import TimerMixin from 'react-timer-mixin';
import { Client, Message } from 'react-native-paho-mqtt';

@observer
class Smart extends Component {
    mixins: [TimerMixin];
    client;
    
   setUpMQTT(id) {
        const myStorage = {
            setItem: (key, item) => {
                myStorage[key] = item;
            },
            getItem: (key) => myStorage[key],
            removeItem: (key) => {
                delete myStorage[key];
            },
        };
        // Create a client instance 
        this.client = new Client({ uri: 'wss://io.adafruit.com:443/mqtt/', clientId: '', storage: myStorage });
        
        this.client.on('connectionLost', (responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.log(responseObject.errorMessage);
            }
        });
        this.client.on('messageReceived', (message) => {
            console.log(message.payloadString);
            smartStore.setSmart (message.payloadString==="OFF"?false:true) ;
        });

        // connect the client 
        this.client.connect({
            userName: initStore.username,
            password: initStore.aioKey
        })
        .then(() => {
            // Once a connection has been made, make a subscription and send a message. 
            console.log('onConnect');
            return this.client.subscribe(initStore.username + '/feeds/'+id);
            //return client.subscribe('World');
        })
        .catch((responseObject) => {
            if (responseObject.errorCode !== 0) {
            console.log('onConnectionLost:' + responseObject.errorMessage);
            }
        });
   }
        
   

   componentWillMount() {
        smartStore.setLoading(false);
        this.loadSmart();
    }

   loadSmart(id,apiKey) {
         fetch('https://io.adafruit.com/api/v2/'+initStore.username+'/feeds/'+detailsStore.group.toLowerCase()+'.smart/details', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-AIO-Key': initStore.aioKey
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    smartStore.setSmart (responseJson.details.data.last.table.value==="OFF"?false:true) ;
                    smartStore.setLoading(false);
                    this.setUpMQTT(responseJson.id);
                })
                .catch((error) => {
                    console.error(error);
                });   
  } 

  setSmart = (value) => {
            const message = new Message(value?'ON':'OFF');
            message.destinationName = this.username + '/feeds/'+detailsStore.group+'.smart';
            this.client.send(message);
            smartStore.setSmart(value);
  };



    render() {
        const apiKey  = this.props.writeApiKey;
        const id = this.props.id;
        const { smart } = smartStore;
       
        const unit ="C";
        return (
                    <View style={[styles.card,{flex: 1,flexDirection: 'row'}]}>
                    <Text  style={{flex:3}}>{smart?"smart window is on":"smart window is off"}</Text>  
                                {smartStore.isSmartLoading?
                                                <ActivityIndicator
                                                    animating={true}
                                                    style={{height: 80}}
                                                    size="large"
                                                    color="#00aa00"
                                                    />
                                                :
                                <Switch 
                                    onValueChange={(value) => this.setSmart(value)}
                                    style={{marginBottom: 10,flex:1}}
                                    value={smart} />
                                }
                  </View>              
        );
    }
}


//make this component available to the app
export default Smart;
