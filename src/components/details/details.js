import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Slider, Switch, ActivityIndicator } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../stylesheet/styles';
import detailsStore  from "../../stores/details/details-store";
import TimerMixin from 'react-timer-mixin';

@observer
class Details extends Component {
    mixins: [TimerMixin];
    constructor(){
        super();
        //console.log(this.props);
    }
   componentWillMount() {
    const id = this.props.id;   
    const apiKey = this.props.readApiKey;
    //windowsStore.addWindow("dfsdfsdf");
    detailsStore.loadDesired(id,apiKey,true);
    detailsStore.loadIndoor(id,apiKey);
    detailsStore.loadOutdoor(id,apiKey);
    detailsStore.loadSmart(id,apiKey);
    detailsStore.loadOpened(id, apiKey);
    
  }
  componentDidMount() {
      const id = this.props.id;   
      const apiKey = this.props.readApiKey;
      
      setInterval(()=>detailsStore.loadDesired(id,apiKey),10000);
      setInterval(()=>detailsStore.loadIndoor(id,apiKey),10000);
      setInterval(()=>detailsStore.loadOutdoor(id,apiKey),10000);
      setInterval(()=>detailsStore.loadSmart(id,apiKey),10000);
      setInterval(()=>detailsStore.loadOpened(id,apiKey),10000);     
  }
  

    render() {
        const apiKey  = this.props.writeApiKey;
        const id = this.props.id;
        const { indoorTemp } = detailsStore;
        const { outdoorTemp } = detailsStore;
        const { desiredTemp } = detailsStore;
        
        const { sliderTemp } = detailsStore;
        const { smart } = detailsStore;
        const { open } = detailsStore;
           
        const unit ="C";
        return (
   
            <View style={styles.container}>
                         <View style={[styles.card,{flex: 2}]}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={stylesLocal.temperatureCard}>
                                            <Text style={{color: 'white'}}>Current Indoor Temperature</Text>
                                            {detailsStore.isIndoorLoading?
                                                <ActivityIndicator
                                                    animating={true}
                                                    style={[stylesLocal.centering, {height: 80}]}
                                                    size="large"
                                                    color="#00aa00"
                                                    />
                                                :
                                                    <Text style={{flex:1,color: 'white',fontWeight: 'bold', alignItems: 'center',justifyContent: 'center', margin:10}}>{indoorTemp} &deg;{unit}</Text>
                                                }
                                            
                                        </View>
                                        <View  style={stylesLocal.temperatureCard}>
                                            <Text style={{color: 'white'}}>Current Outdoor Temperature</Text>
                                            {detailsStore.isOutdoorLoading?
                                                <ActivityIndicator
                                                    animating={true}
                                                    style={[stylesLocal.centering, {height: 80}]}
                                                    size="large"
                                                    color="#00aa00"
                                                    />
                                                :
                                            <Text style={{flex:1,color: 'white', fontWeight: 'bold', alignItems: 'center', justifyContent: 'center', margin:10}}>{outdoorTemp} &deg;{unit}</Text>
                                            }
                                        </View>
                                    </View>
                           </View>  

                           <View style={[styles.card,{flex: 2}]}>
                                    
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
                                            
                                    
                                
                                {detailsStore.isDesiredDifferentFromSlider &&
                                    <View style={{flex:1, flexDirection:"row"}}>
                                        <Button
                                            onPress = {()=>detailsStore.setDesired(id, )}
                                            title={"Set to "+sliderTemp+" "+unit}
                                            color="#841584"
                                            accessibilityLabel="Set the desired temperature"
                                            style={{flex:1}}
                                        /> 
                                        <Button
                                            onPress = {()=>detailsStore.resetSlider()}
                                            title="Reset"
                                            color="#841584"
                                            accessibilityLabel="Reset the desired temperature"
                                            style={{flex:1}}
                                        /> 
                                    </View>
 
                                }
                            </View>
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
                            <View style={[styles.card,{flex: 1, flexDirection: 'row'}]}>          
                                <Text  style={{flex:1}}>{open?"window is open":"Window is closed"}</Text>   
                                {detailsStore.isOpenLoading?
                                                <ActivityIndicator
                                                    animating={true}
                                                    style={[stylesLocal.centering, {height: 80}]}
                                                    size="large"
                                                    color="#00aa00"
                                                    />
                                                :  
                                <Switch
                                    onValueChange={(value) => detailsStore.setOpen(value)}
                                    style={{marginBottom: 10,flex:1}}
                                    value={open} /> 
                                }
                            </View>      
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
export default Details;
