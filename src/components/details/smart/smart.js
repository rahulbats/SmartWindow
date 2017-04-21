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
    smartStore.loadSmart(id,apiKey);
  }

  componentDidMount() {
      const id = this.props.id;   
      const apiKey = this.props.readApiKey;
      
      setInterval(()=>smartStore.loadSmart(id,apiKey),10000);
      
  }
  

    render() {
        const apiKey  = this.props.writeApiKey;
        const id = this.props.id;
        const { smart } = smartStore;
       
        const unit ="C";
        return (
                    <View style={[styles.card,{flex: 1,flexDirection: 'row'}]}>
                    <Text  style={{flex:1}}>{smart?"smart window is on":"smart window is off"}</Text>  
                                {detailsStore.isSmartLoading?
                                                <ActivityIndicator
                                                    animating={true}
                                                    style={[stylesLocal.centering, {height: 80}]}
                                                    size="large"
                                                    color="#00aa00"
                                                    />
                                                :
                                <Switch 
                                    onValueChange={(value) => detailsStore.setSmart(value)}
                                    style={{marginBottom: 10,flex:1}}
                                    value={smart} />
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
export default Outdoor;
