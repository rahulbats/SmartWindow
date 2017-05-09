import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Slider, Switch, ActivityIndicator } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../../stylesheet/styles';
import desiredStore  from "../../../stores/details/desired/desired-store";
import TimerMixin from 'react-timer-mixin';


@observer
class Desired extends Component {
    mixins: [TimerMixin];
   
    loadDesired(id,apiKey,setSlider) {
        
         fetch('https://api.thingspeak.com/channels/'+id+'/fields/3/last.json?api_key='+apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                
                desiredStore.setDesired (Number(responseJson.field3)) ;
                if(setSlider) {
                  desiredStore.setSlider(Number(responseJson.field3));
                }
                desiredStore.setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }  

   componentWillMount() {
        const id = this.props.id;   
        const apiKey = this.props.readApiKey;
        desiredStore.setLoading(true);
        desiredStore.loadDesired(id,apiKey,true);
  }


  componentDidMount() {
      const id = this.props.id;   
      const apiKey = this.props.readApiKey;
      setInterval(()=>desiredStore.loadDesired(id,apiKey),15000);
  }
  

    render() {
        const apiKey  = this.props.writeApiKey;
        const id = this.props.id;
        
        const unit =this.props.unit;
        
        return (
   
                    <View style={{flex:1, flexDirection:'column'}}>
                        {desiredStore.isDesiredLoading?
                                    <ActivityIndicator
                                                    animating={true}
                                                    size="small"
                                                    color="#00aa00"
                                                    />        
                                                    :
                                    <Text style={[styles.text, {margin:10}]} > Desired Temperature: {desiredStore.getDesiredTemp} &deg;{unit}</Text>
                                                    
                                }                
                                <Slider minimumValue={desiredStore.getMinTemp} maximumValue={desiredStore.getMaxTemp} step={1} value={desiredStore.sliderTemp} onValueChange={(value) => desiredStore.setSlider(value)} />

                                {desiredStore.isDesiredDifferentFromSlider &&
                                    <View style={{flex:1, flexDirection:"row"}}>
                                        <View style={{flex:1}}>
                                        <Button
                                            onPress = {()=>desiredStore.setDesired(apiKey )}
                                            title={"SET TO "+desiredStore.sliderTemp+unit}
                                            color="#841584"
                                            accessibilityLabel="Set the desired temperature"
                                        /> 
                                        </View>
                                        <View style={{flex:1, alignItems:'center'}}>
                                        <Button
                                            onPress = {()=>desiredStore.resetSlider()}
                                            title="RESET"
                                            color="#841584"
                                            accessibilityLabel="Reset the desired temperature"
                                        /> 
                                        </View>
                                    </View>
 
                                }
                        
                    </View>
            
        );
    }
}


//make this component available to the app
export default Desired;
