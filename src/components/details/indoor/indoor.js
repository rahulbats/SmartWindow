import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Slider, Switch, ActivityIndicator } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../../stylesheet/styles';
import indoorStore  from "../../../stores/details/indoor/indoor-store";
import TimerMixin from 'react-timer-mixin';


@observer
class Indoor extends Component {
    mixins: [TimerMixin];
   
   componentWillMount() {

    const id = this.props.id;   
    const apiKey = this.props.readApiKey;
    indoorStore.setLoading(true);
    this.loadIndoor(id,apiKey)
                .catch((error) => {
                    console.error(error);
                });
  }

  componentDidMount() {
      const id = this.props.id;   
      const apiKey = this.props.readApiKey;
      setInterval(
        () => { this.loadIndoor(id, apiKey) },
        15000
      );
  }
  
  loadIndoor(id,apiKey) {
         
         return fetch('https://api.thingspeak.com/channels/'+id+'/fields/1/last.json?api_key='+apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                indoorStore.setIndoorTemp(Number(responseJson.field1))
                indoorStore.setLoading(false) ;
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
