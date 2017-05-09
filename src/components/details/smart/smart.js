import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Slider, Switch, ActivityIndicator } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../../stylesheet/styles';
import smartStore  from "../../../stores/details/smart/smart-store";
import TimerMixin from 'react-timer-mixin';


@observer
class Smart extends Component {
    mixins: [TimerMixin];
   
   componentWillMount() {
    const id = this.props.id;   
    const apiKey = this.props.readApiKey;
    smartStore.setLoading(true);
    this.loadSmart(id,apiKey);
  }

  componentDidMount() {
      const id = this.props.id;   
      const apiKey = this.props.readApiKey;
      
      setInterval(()=>this.loadSmart(id,apiKey),15000);
      
  }
  
  loadSmart(id,apiKey) {
         fetch('https://api.thingspeak.com/channels/'+id+'/fields/5/last.json?api_key='+apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                smartStore.setSmart (responseJson.field5==="0"?false:true);
                smartStore.setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
  }

    render() {
        const apiKey  = this.props.writeApiKey;
        const id = this.props.id;
        const { smart } = smartStore;
       
        const unit ="C";
        return (
                    <View style={[styles.card,{flex: 1,flexDirection: 'row'}]}>
                    <Text  style={{flex:3}}>{smart?"smart window is on":"smart window is off"}</Text>  
                                {smartStore.isSmartLoading?
                                                <ActivityIndicator
                                                    animating={true}
                                                    style={{height: 80}}
                                                    size="large"
                                                    color="#00aa00"
                                                    />
                                                :
                                <Switch 
                                    onValueChange={(value) => smartStore.changeSmart(value, apiKey)}
                                    style={{marginBottom: 10,flex:1}}
                                    value={smart} />
                                }
                  </View>              
        );
    }
}


//make this component available to the app
export default Smart;
