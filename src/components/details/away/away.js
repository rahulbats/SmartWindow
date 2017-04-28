import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Slider, Switch, ActivityIndicator } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../../stylesheet/styles';
import awayStore  from "../../../stores/details/away/away-store";
import TimerMixin from 'react-timer-mixin';


@observer
class Away extends Component {
    mixins: [TimerMixin];
   
   componentWillMount() {
    const id = this.props.id;   
    const apiKey = this.props.readApiKey;
    awayStore.loadAway(id,apiKey);
  }

  componentDidMount() {
      const id = this.props.id;   
      const apiKey = this.props.readApiKey;
      
      setInterval(()=>awayStore.loadAway(id,apiKey),15000);
      
  }
  

    render() {
        const apiKey  = this.props.writeApiKey;
        const id = this.props.id;
        const { away } = awayStore;
       
        const unit ="C";
        return (
                    <View style={[styles.card,{flex: 1,flexDirection: 'row'}]}>
                    <Text  style={{flex:3}}>{away?"Shutdown when away":"Dont shutdown when away"}</Text>  
                                {awayStore.isLoading?
                                                <ActivityIndicator
                                                    animating={true}
                                                    style={{height: 80}}
                                                    size="large"
                                                    color="#00aa00"
                                                    />
                                                :
                                <Switch 
                                    onValueChange={(value) => awayStore.setAway(value, apiKey)}
                                    style={{marginBottom: 10,flex:1, alignSelf: 'flex-end'}}
                                    value={away} />
                                }
                  </View>              
        );
    }
}


//make this component available to the app
export default Away;
