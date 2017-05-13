import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Switch, 
    ActivityIndicator,
    NetInfo,
    TouchableOpacity,
    Image
 } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../../stylesheet/styles';
import statusStore  from "../../../stores/details/status/status-store";
import initStore from '../../../stores/tsinit/tsinit-store';
import detailsStore from '../../../stores/details/details-store';
import TimerMixin from 'react-timer-mixin';
import { Client, Message } from 'react-native-paho-mqtt';



@observer
class Status extends Component {
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
            statusStore.setOpen (message.payloadString==="OFF"?false:true) ;
        });

        // connect the client 
        this.client.connect({
            userName: initStore.username,
            password: initStore.aioKey
        })
        .then(() => {
            // Once a connection has been made, make a subscription and send a message. 
            console.log('onConnect');
            return this.client.subscribe(initStore.username + '/f/'+id);
            //return client.subscribe('World');
        })
        .catch((responseObject) => {
            if (responseObject.errorCode !== 0) {
            console.log('onConnectionLost:' + responseObject.errorMessage);
            }
        });
   }

   componentWillMount() {
        statusStore.setLoading(false);
        this.loadStatus();
    }

   loadStatus(id,apiKey) {
         fetch('https://io.adafruit.com/api/v2/'+initStore.username+'/feeds/'+detailsStore.group.toLowerCase()+'.window-command/details', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-AIO-Key': initStore.aioKey
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    statusStore.setOpen (responseJson.details.data.last.table.value==="OFF"?false:true) ;
                    statusStore.setLoading(false);
                    this.setUpMQTT(id);
                })
                .catch((error) => {
                    console.error(error);
                });   
  } 

  setStatus = (value) => {
            const message = new Message(value?'ON':'OFF');
            message.destinationName = this.username + '/feeds/'+detailsStore.group+'.window-command';
            this.client.send(message);
            statusStore.setOpen(value);
           
  };


  /*showErrorAlert = () => {
    Alert.alert(
            'Thingspeak returned error',
            'You might be updating too quickly. Thingspeak allows 1 update per 15 seconds for free accounts.',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
        );
  };*/

    render() {
        const apiKey  = this.props.writeApiKey;
        const id = this.props.id;
        const { open } = statusStore;
        const unit ="C";
        
        return (
                     
                    <View style={[styles.card,{flex: 1, flexDirection: 'row'}]}>   
                                
                                <Text  style={{flex:2}}>{open?"Close window":"Open window"}</Text>  
                                      
                                {statusStore.isStatusLoading ?
                                                <ActivityIndicator
                                                    animating={true}
                                                    style={{height: 80}}
                                                    size="large"
                                                    color="#00aa00"
                                                    />
                                                :  
                                <Switch
                                    onValueChange={(value) => {
                                                  this.setStatus(value);
                                            }
                                        }
                                    style={{marginBottom: 10,flex:1}}
                                    value={open} /> 
                                }
                            </View>            
        );
    }

   
}



//make this component available to the app
export default Status;
