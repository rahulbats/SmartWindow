import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Slider, Switch, ActivityIndicator } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../../stylesheet/styles';
import indoorStore  from "../../../stores/details/indoor/indoor-store";
import detailsStore from '../../../stores/details/details-store';
import initStore from '../../../stores/tsinit/tsinit-store';
import TimerMixin from 'react-timer-mixin';
import { Client, Message } from 'react-native-paho-mqtt';

@observer
class Indoor extends Component {
    mixins: [TimerMixin];
    client;

   constructor() {
        super();
        const username = initStore.username;
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
            indoorStore.setIndoorTemp (Number(message.payloadString)) ;
        });

        // connect the client 
        this.client.connect({
            userName: initStore.username,
            password: initStore.aioKey
        })
        .then(() => {
            // Once a connection has been made, make a subscription and send a message. 
            console.log('onConnect');
            return this.client.subscribe(initStore.username + '/feeds/'+detailsStore.group+'.indoor-temp');
            //return client.subscribe('World');
        })
        .catch((responseObject) => {
            if (responseObject.errorCode !== 0) {
            console.log('onConnectionLost:' + responseObject.errorMessage);
            }
        });
   }
    

 componentWillMount() {
    indoorStore.setLoading(true);
    this.loadIndoor();
  }

  loadIndoor(id,apiKey) {
         fetch('https://io.adafruit.com/api/v2/'+initStore.username+'/feeds/'+detailsStore.group.toLowerCase()+'.indoor-temp/details', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-AIO-Key': initStore.aioKey
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                indoorStore.setIndoorTemp (Number(responseJson.details.data.last.table.value));
                indoorStore.setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });   
  }  


    render() {
        const apiKey  = this.props.writeApiKey;
        const id = this.props.id;
        
        const unit =this.props.unit;
        
        return (
   
                    <View style={stylesLocal.temperatureCard}>
                        <Text style={{color: 'white'}}>Current Indoor Temperature</Text>
                        {indoorStore.isLoading?
                            <ActivityIndicator
                                animating={true}
                                size="small"
                                color="white"
                                />
                            :
                                <Text style={{color: 'white',fontWeight: 'bold', alignItems: 'center',justifyContent: 'center', margin:10}}>
                                    {indoorStore.getIndoorTemp} &deg;{unit}
                                </Text>
                            }
                        
                    </View>
            
        );
    }
}

const stylesLocal = StyleSheet.create({
    temperatureCard:{
        flex:1, 
        padding:5,
        backgroundColor:'#2ad', 
        margin:5,
        borderRadius: 3,
        flexDirection: 'column'
    }
    
});


//make this component available to the app
export default Indoor;
