import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Slider, Switch, ActivityIndicator } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../../stylesheet/styles';
import desiredStore  from "../../../stores/details/desired/desired-store";
import detailsStore from '../../../stores/details/details-store';
import initStore from '../../../stores/tsinit/tsinit-store';
import TimerMixin from 'react-timer-mixin';
import { Client, Message } from 'react-native-paho-mqtt';

@observer
class Desired extends Component {
    mixins: [TimerMixin];
    client;
    id;

    setDesired = (value) => {
            desiredStore.setDesired(value);
            detailsStore.sendMessage(this.id);
    };

  

    render() {
        const unit =this.props.unit;
        this.id = this.props.id;
        return (
   
                    <View style={{flex:1, flexDirection:'column'}}>
                        {desiredStore.isDesiredLoading?
                                    <ActivityIndicator
                                                    animating={true}
                                                    size="small"
                                                    color="#00aa00"
                                                    />        
                                                    :
                                    <Text style={[styles.text, {margin:10}]} > Desired Temperature: {desiredStore.getDesiredTemp} &deg;{unit}</Text>
                                                    
                                }                
                                <Slider minimumValue={desiredStore.getMinTemp} 
                                    maximumValue={desiredStore.getMaxTemp} step={1} 
                                    value={desiredStore.desiredTemp} 
                                    onSlidingComplete={(value) => this.setDesired(value)} 
                                    onValueChange={(value)=>desiredStore.setDesired(value)}
                                />

                                
                        
                    </View>
            
        );
    }
}


//make this component available to the app
export default Desired;
