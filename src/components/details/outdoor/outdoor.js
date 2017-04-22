import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Slider, Switch, ActivityIndicator } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../../stylesheet/styles';
import outdoorStore  from "../../../stores/details/outdoor/outdoor-store";
import TimerMixin from 'react-timer-mixin';


@observer
class Outdoor extends Component {
    mixins: [TimerMixin];
   
   componentWillMount() {
    const id = this.props.id;   
    const apiKey = this.props.readApiKey;
    //windowsStore.addWindow("dfsdfsdf");
    outdoorStore.loadOutdoor(id,apiKey);
  }

  componentDidMount() {
      const id = this.props.id;   
      const apiKey = this.props.readApiKey;
      
      setInterval(()=>outdoorStore.loadOutdoor(id,apiKey),10000);
  }
  

    render() {
        const apiKey  = this.props.writeApiKey;
        const id = this.props.id;
        const unit =this.props.unit;
        
        return (
   
                    <View style={stylesLocal.temperatureCard}>
                        <Text style={{color: 'white'}}>Current Outdoor Temperature</Text>
                        {outdoorStore.isOutdoorLoading?
                            <ActivityIndicator
                                animating={true}
                                size="small"
                                color="white"
                                />
                            :
                                <Text style={{color: 'white',fontWeight: 'bold', alignItems: 'center',justifyContent: 'center', margin:10}}>
                                    { outdoorStore.getOutdoorTemp }  &deg;{unit}

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
export default Outdoor;
