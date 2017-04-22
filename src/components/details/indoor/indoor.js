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
    //windowsStore.addWindow("dfsdfsdf");
    indoorStore.loadIndoor(id,apiKey);
  }

  componentDidMount() {
      const id = this.props.id;   
      const apiKey = this.props.readApiKey;
      
      setInterval(()=>indoorStore.loadIndoor(id,apiKey),10000);
      
  }
  

    render() {
        const apiKey  = this.props.writeApiKey;
        const id = this.props.id;
        
        const unit =this.props.unit;
        
        return (
   
                    <View style={stylesLocal.temperatureCard}>
                        <Text style={{color: 'white'}}>Current Indoor Temperature</Text>
                        {indoorStore.isIndoorLoading?
                            <ActivityIndicator
                                animating={true}
                                style={[stylesLocal.centering, {height: 80}]}
                                size="large"
                                color="#00aa00"
                                />
                            :
                                <Text style={{flex:1,color: 'white',fontWeight: 'bold', alignItems: 'center',justifyContent: 'center', margin:10}}>
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
        height:100,
        padding:5,
        backgroundColor:'#2ad', 
        margin:5,
        borderRadius: 3
    }
    
});


//make this component available to the app
export default Indoor;
