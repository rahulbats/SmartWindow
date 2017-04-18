//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Keyboard } from 'react-native';
import {observer } from "mobx-react/native";
import {WindowList} from "../list/list"
import styles from '../../stylesheet/styles';
import windowsStore from '../list/list-store'
@observer
class TsInit extends Component {
    
    updateProperty ( value) {
        this.props.store.setApiKey (value);
    }
    constructor(){
        super();
        //console.log(this.props);
    }
    gotoList(apiKey){
        //windowsStore.loadWindows(apiKey);
        Keyboard.dismiss(); 
        this.props.navigator.push( {
                name: "windowlist",
                title: "Windows List",
                passProps: {
                    type: "Modal",
                    //store: windowsStore,
                    apiKey: apiKey
                }
            }
        );
    }
    render() {
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
                            onPress = {()=>this.gotoList(apiKey)}
                            title="Connect"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
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
