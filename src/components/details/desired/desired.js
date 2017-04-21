import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Slider, Switch, ActivityIndicator } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../../stylesheet/styles';
import desiredStore  from "../../../stores/details/desired/desired-store";
import TimerMixin from 'react-timer-mixin';


@observer
class Desired extends Component {
    mixins: [TimerMixin];
   
   componentWillMount() {
    const id = this.props.id;   
    const apiKey = this.props.readApiKey;
    //windowsStore.addWindow("dfsdfsdf");
    desiredStore.loadIndoor(id,apiKey);
  }

  componentDidMount() {
      const id = this.props.id;   
      const apiKey = this.props.readApiKey;
      
      setInterval(()=>desiredStore.loadIndoor(id,apiKey),10000);
      
  }
  

    render() {
        const apiKey  = this.props.writeApiKey;
        const id = this.props.id;
        const { desiredTemp } = desiredStore;
       
        const unit ="C";
        return (
   
                    <View>
                        {detailsStore.isDesiredLoading?
                                    <ActivityIndicator
                                                    animating={true}
                                                    style={[stylesLocal.centering, {height: 80}]}
                                                    size="large"
                                                    color="#00aa00"
                                                    />        
                                                    :
                                    <Text style={[styles.text, {margin:10}]} > Desired Temperature: {desiredTemp} &deg;{unit}</Text>
                                                    
                                }                
                                    <Slider minimumValue={10} maximumValue={100} step={1} value={sliderTemp} onValueChange={(value) => detailsStore.setSlider(value)} />
                        
                    </View>
            
        );
    }
}


//make this component available to the app
export default Desired;
