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
import detailsStore from '../../stores/details/details-store';

@observer
class Details extends Component {
    mixins: [TimerMixin];
    constructor(){
        super();
        //this.state = {unit: 'C'};
    }
   
  

    render() {
        const writeApiKey  = this.props.writeApiKey;
        const readApiKey  = this.props.readApiKey;
        const id = this.props.id;
        const {unit} = detailsStore;
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
                                        <Indoor id={id} readApiKey={readApiKey} unit={unit}/>
                                        <Outdoor id={id} readApiKey={readApiKey} unit={unit}/>
                                    </View>
                           </View>  

                           <View style={[styles.card,{flex: 2}]}>
                                    
                                <Desired id={id} readApiKey={readApiKey} unit={unit} writeApiKey={writeApiKey}/>
                               
                            </View>
                         
                            <Smart id={id} readApiKey={readApiKey} writeApiKey={writeApiKey}/>
                            <Status id={id} readApiKey={readApiKey} writeApiKey={writeApiKey}/>
                            
                            
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
