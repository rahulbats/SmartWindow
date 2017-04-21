import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Slider, Switch, ActivityIndicator } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../stylesheet/styles';
import TimerMixin from 'react-timer-mixin';
import Indoor from './indoor/indoor';
import Outdoor from './outdoor/outdoor';
import Desired from './desired/desired';
import Smart from './smart/smart';
import Status from './status/status';

@observer
class Details extends Component {
    mixins: [TimerMixin];
    constructor(){
        super();
        //console.log(this.props);
    }
   
  

    render() {
        const apiKey  = this.props.writeApiKey;
        const readApiKey  = this.props.readApiKey;
        const id = this.props.id;
        const unit ="C";
        return (
   
            <View style={styles.container}>
                         <View style={[styles.card,{flex: 2}]}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Indoor id={id} readApiKey={readApiKey}/>
                                        <Outdoor id={id} readApiKey={readApiKey}/>
                                    </View>
                           </View>  

                           <View style={[styles.card,{flex: 2}]}>
                                    
                                <Desired id={id} readApiKey={readApiKey}/>
                               
                            </View>
                         
                            <Smart id={id} readApiKey={readApiKey}/>
                            <Status id={id} readApiKey={readApiKey}/>
                            
                            
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
