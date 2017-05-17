import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Slider, Switch, TouchableHighlight, ActivityIndicator } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../stylesheet/styles';
import TimerMixin from 'react-timer-mixin';
import Indoor from './indoor/indoor';
import Outdoor from './outdoor/outdoor';
import Desired from './desired/desired';
import Smart from './smart/smart';
import Status from './status/status';
import windowsStore from '../../stores/list/list-store';
import initStore from '../../stores/tsinit/tsinit-store';
import detailsStore from '../../stores/details/details-store';
import indoorStore  from "../../stores/details/indoor/indoor-store";
import outdoorStore  from "../../stores/details/outdoor/outdoor-store";
import desiredStore  from "../../stores/details/desired/desired-store";
import smartStore  from "../../stores/details/smart/smart-store";
import statusStore  from "../../stores/details/status/status-store";
import { Client } from 'react-native-paho-mqtt';

@observer
class Details extends Component {
    mixins: [TimerMixin];
    constructor(){
        super();
        //this.state = {unit: 'C'};
    }
   
   
   

   initialLoad(){
       fetch('https://io.adafruit.com/api/v2/'+initStore.username+'/feeds/'+detailsStore.key, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-AIO-Key': initStore.aioKey
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.last_value!==null) {
                    var values = responseJson.last_value.split('_');
                    indoorStore.setIndoorTemp (Number(values[0]));
                    outdoorStore.setOutdoorTemp(Number(values[1]));
                    desiredStore.setDesired(Number(values[2]));
                    statusStore.setOpen (values[3]==="1"?true:false);
                    smartStore.setSmart (values[4]==="1"?true:false);

                }
                    
                statusStore.setLoading(false);
                smartStore.setLoading(false);
                indoorStore.setLoading(false);
                outdoorStore.setLoading(false);
                desiredStore.setLoading(false);
                
            })
            .catch((error) => {
                console.error(error);
            });   
   }

   componentWillMount() {
        windowsStore.client.subscribe(initStore.username + '/feeds/'+detailsStore.id);
        statusStore.setLoading(true);
        smartStore.setLoading(true);
        indoorStore.setLoading(true);
        outdoorStore.setLoading(true);
        desiredStore.setLoading(true);
        this.initialLoad();
    }

    componentWillUnmount() {
        windowsStore.client.unsubscribe(initStore.username + '/feeds/'+detailsStore.id);
    }

    render() {
        const writeApiKey  = this.props.writeApiKey;
        const readApiKey  = this.props.readApiKey;
        const {unit, id} = detailsStore;
        return (
   
            <View style={styles.container}>
                         <View style={{flex: 0.5}}>
                                    <View style={{flexDirection: 'row', alignItems:'flex-start', justifyContent: 'flex-start'}}>
                                       
                                        <TouchableHighlight 
                                            onPress={() => detailsStore.setUnit('C')}
                                            style={
                                                unit === 'C'?
                                                [stylesLocal.unitCard, stylesLocal.unitSelected]
                                                :
                                                stylesLocal.unitCard
                                                }>
                                            <Text style={
                                                unit === 'C' &&
                                                stylesLocal.unitSelectedText
                                                }>
                                                &deg;C
                                            </Text>
                                        </TouchableHighlight>
                                         <View>
                                            <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                                        </View>
                                        
                                        <TouchableHighlight 
                                            onPress={() => detailsStore.setUnit('F')}
                                            style={
                                                unit === 'F'?
                                                [stylesLocal.unitCard, stylesLocal.unitSelected]
                                                :
                                                stylesLocal.unitCard
                                                }>
                                            <Text style={
                                                unit === 'F' &&
                                                stylesLocal.unitSelectedText
                                                }>
                                                &deg;F
                                            </Text>
                                        </TouchableHighlight>
                                       
                                    </View>
                           </View>     
                         <View style={[styles.card,{flex: 2}]}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Indoor id={id} unit={unit}/>
                                        <Outdoor id={id} unit={unit}/>
                                    </View>
                           </View>  

                           <View style={[styles.card,{flex: 2}]}>
                                    
                                <Desired id={id} unit={unit}/>
                               
                            </View>
                            <Status id={id}/>
                            <Smart id={id}/>
                            
                           
            </View>

        );
    }
}

const stylesLocal = StyleSheet.create({
    unitSelected:{
        backgroundColor:'#2ad'
    },
    unitSelectedText:{
        color:'white'
    },
    unitCard:{
        alignSelf: 'flex-start',
        width:30, 
        //height:40,
        padding:5,
        backgroundColor:'white',
        borderRadius: 3,
        borderColor: 'lightgrey',
        borderWidth: 1,
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 2,
        },
    }
});


//make this component available to the app
export default Details;
