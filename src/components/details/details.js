import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Slider, Switch } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../stylesheet/styles';
import detailsStore  from "./details-store";

@observer
class Details extends Component {
    
    constructor(){
        super();
        //console.log(this.props);
    }
   
    render() {
        const apiKey  = this.props.apiKey
        const { indoorTemp } = detailsStore;
        const { outdoorTemp } = detailsStore;
        const { desiredTemp } = detailsStore;
        const { smart } = detailsStore;
        const { open } = detailsStore;
        return (
   
            <View style={styles.container}>
                         <View style={[styles.card,{flex: 2}]}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={stylesLocal.temperatureCard}>
                                            <Text style={{color: 'white'}}>Current Indoor Temperature</Text>
                                            <Text style={{color: 'white'}}>{indoorTemp}</Text>
                                        </View>
                                        <View  style={stylesLocal.temperatureCard}>
                                            <Text style={{color: 'white'}}>Current Outdoor Temperature</Text>
                                            <Text style={{color: 'white'}}>{outdoorTemp}</Text>
                                        </View>
                                    </View>
                           </View>  

                           <View style={[styles.card,{flex: 1}]}>
                                <Text style={[styles.text, {margin:10}]} > Desired Temperature: {desiredTemp}</Text>    
                                <Slider minimumValue={10} maximumValue={100} value={desiredTemp} onValueChange={(value) => detailsStore.setDesired(value)} /> 
                            </View>
                            <View style={[styles.card,{flex: 1,flexDirection: 'row'}]}>   
                                <Text  style={{flex:1}}>{smart?"smart window is on":"smart window is off"}</Text>  
                                <Switch 
                                    onValueChange={(value) => detailsStore.setSmart(value)}
                                    style={{marginBottom: 10,flex:1}}
                                    value={smart} />
                            </View>
                            <View style={[styles.card,{flex: 1, flexDirection: 'row'}]}>          
                                <Text  style={{flex:1}}>{open?"window is open":"Window is closed"}</Text>     
                                <Switch
                                    onValueChange={(value) => detailsStore.setOpen(value)}
                                    style={{marginBottom: 10,flex:1}}
                                    value={open} /> 
                            </View>      
            </View>

        );
    }
}

const stylesLocal = StyleSheet.create({
    temperatureCard:{
        flex:1, 
        height:100,
        padding:5,
        backgroundColor:'#2ad', 
        margin:5,
        borderRadius: 3
    }
    
});


//make this component available to the app
export default Details;
