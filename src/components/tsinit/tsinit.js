//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Keyboard, AsyncStorage } from 'react-native';
import {observer } from "mobx-react/native";
import {WindowList} from "../list/list"
import styles from '../../stylesheet/styles';
@observer
class TsInit extends Component {
    
    updateProperty ( value) {
        this.props.store.setApiKey (value);
    }
    constructor(){
        super();
        //console.log(this.props);
        
    }
    async retrieveApiKey(){
        try {
            const value = await AsyncStorage.getItem('apiKey');
            if (value !== null){
                // We have data!!
                this.props.store.apiKey = value;
                this.gotoList(value);
            }
        } catch (error) {
        // Error retrieving data
        }
    }
    async saveApiKey(apiKey){
        Keyboard.dismiss(); 
        try {
            await AsyncStorage.setItem('apiKey', apiKey);
        } catch (error) {
        // Error saving data
        }
        this.gotoList(apiKey);
    }
     gotoList(apiKey){
        //windowsStore.loadWindows(apiKey);
        
        this.props.navigator.push( {
                name: "windowlist",
                title: "Windows List",
                passProps: {
                    type: "Modal",
                    apiKey: apiKey
                }
            }
        );
    }
    render() {
        this.retrieveApiKey();
        const { apiKey } = this.props.store
        return (
   
            <View style={styles.container}>
                        <View style={styles.heading}>
                            <Text style={[styles.headingText,styles.text]}>Welcome to SmartWindow. To get started connect to your thingspeak account using the apikey. </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text)=>this.updateProperty(text)}
                            value={apiKey}
                            placeholder="Thingspeak API key"
                            maxLength={20}
                        />
                        {apiKey!==''&&
                        <View style={styles.button}>
                        <Button
                            onPress = {()=>this.saveApiKey(apiKey)}
                            title="Connect"
                            color="#841584"
                            accessibilityLabel="Connect to thingspeak using your api key"
                            /> 
                            </View>  
                        }   

                         <View style={styles.logoContainer} >
                            <Image style={styles.logo} source={require('../../images/window_logo.png')}/>
                        </View>
            </View>
            
        );
    }
}

//make this component available to the app
export default TsInit;