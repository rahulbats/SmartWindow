import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Switch, 
    ActivityIndicator,
    NetInfo,
    TouchableOpacity,
    Image
 } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../../stylesheet/styles';
import smartStore  from "../../../stores/details/smart/smart-store";
import initStore from '../../../stores/tsinit/tsinit-store';
import detailsStore from '../../../stores/details/details-store';
import TimerMixin from 'react-timer-mixin';
import { Client, Message } from 'react-native-paho-mqtt';



@observer
class Smart extends Component {
    mixins: [TimerMixin];
    client;
    id;

  setSmart = (value) => {
            smartStore.setSmart(value);
            detailsStore.sendMessage(this.id);
            
  };


  /*showErrorAlert = () => {
    Alert.alert(
            'Thingspeak returned error',
            'You might be updating too quickly. Thingspeak allows 1 update per 15 seconds for free accounts.',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
        );
  };*/

    render() {
        this.id = this.props.id;
        const { smart } = smartStore;
        const unit ="C";
        
        return (
                     
                    <View style={[styles.card,{flex: 1, flexDirection: 'row'}]}>   
                                
                                <Text  style={{flex:2}}>{smart?"Smart is on":"Smart is off"}</Text>  
                                      
                                {smartStore.isLoading?
                                                <ActivityIndicator
                                                    animating={true}
                                                    style={{height: 80}}
                                                    size="large"
                                                    color="#00aa00"
                                                    />
                                                :  
                                <Switch
                                    onValueChange={(value) => {
                                                  this.setSmart(value);
                                            }
                                        }
                                    style={{marginBottom: 10,flex:1}}
                                    value={smart} /> 
                                }
                            </View>            
        );
    }

   
}



//make this component available to the app
export default Smart;
