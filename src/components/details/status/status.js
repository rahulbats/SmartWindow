import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Slider, Switch, ActivityIndicator } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../../stylesheet/styles';
import statusStore  from "../../../stores/details/status/status-store";
import TimerMixin from 'react-timer-mixin';


@observer
class Status extends Component {
    mixins: [TimerMixin];
   
   componentWillMount() {
    const id = this.props.id;   
    const apiKey = this.props.readApiKey;
    statusStore.loadStatus(id,apiKey);
  }

  componentDidMount() {
      const id = this.props.id;   
      const apiKey = this.props.readApiKey;
      
      setInterval(()=>statusStore.loadStatus(id,apiKey),10000);
      
  }
  

    render() {
        const apiKey  = this.props.writeApiKey;
        const id = this.props.id;
        const { open } = statusStore;
       
        const unit ="C";
        return (
                    <View style={[styles.card,{flex: 1, flexDirection: 'row'}]}>          
                                <Text  style={{flex:1}}>{open?"window is open":"Window is closed"}</Text>   
                                {statusStore.isStatusLoading?
                                                <ActivityIndicator
                                                    animating={true}
                                                    style={{height: 80}}
                                                    size="large"
                                                    color="#00aa00"
                                                    />
                                                :  
                                <Switch
                                    onValueChange={(value) => statusStore.setStatus(value)}
                                    style={{marginBottom: 10,flex:1}}
                                    value={open} /> 
                                }
                            </View>            
        );
    }
}



//make this component available to the app
export default Status;
