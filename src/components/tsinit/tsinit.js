//import liraries
import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, 
    TextInput, Button, Image, Keyboard, 
    AsyncStorage, Dimensions, Animated , KeyboardAvoidingView,
    Easing, FadeInView, Linking, TouchableOpacity
} from 'react-native';
import {observer } from "mobx-react/native";
import {WindowList} from "../list/list"
//import styles from '../../stylesheet/styles';
@observer
class TsInit extends Component {
    
    updateProperty ( value) {
        this.props.store.setApiKey (value);
    }
    constructor(){
        super();
        this.state = {
            fadeAnim: new Animated.Value(0),
        };
        
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

    componentDidMount() {
        Animated.timing(
        this.state.fadeAnim,
        {
            toValue: 1,
            duration: 2000,
        }                              
        ).start();                
        this.retrieveApiKey();
    }

    render() {
        
        
        const { apiKey } = this.props.store
        return (
                         
                            <Animated.View                            // Special animatable View
                                style={{flex:1,opacity: this.state.fadeAnim,  backgroundColor:'black'}}>
                            
                            <StatusBar
                                backgroundColor="blue"
                                barStyle="light-content"
                                hidden={true}
                            />         
                            <Image style={styles.backgroundpic} source={require('../../images/window-photo.jpeg')} resizeMode='stretch'>
                                     <View style={{flex:1}}></View>  
                                     <Image style={{flex:1,alignSelf:'center'}} source={require('../../images/Logo.png')} resizeMode='contain'/>

                                     <KeyboardAvoidingView behavior={'padding'} style={[styles.heading, {flex:1}]}>

                                                <Text style={styles.headingText}>Welcome to SmartWindow.</Text>
                                                
                                                <Text style={styles.headingText}>Connect to thingspeak.</Text>
                                                 
                                                 <TextInput
                                                    style={styles.input}
                                                    onChangeText={(text)=>this.updateProperty(text)}
                                                    value={apiKey}
                                                    placeholder="Thingspeak API key"
                                                    maxLength={20}
                                                    underlineColorAndroid={'transparent'}
                                                />
                                                   <View style={styles.button}>
                                                    <Button
                                                        onPress = {()=>this.saveApiKey(apiKey)}
                                                        title="Connect"
                                                        color="green"
                                                        accessibilityLabel="Connect to thingspeak using your api key"
                                                        /> 
                                                    
                                                  <TouchableOpacity onPress={() => Linking.openURL('https://thingspeak.com/account/profile')}>
                                                        <Text style={[styles.headingText,{color:'lightblue', marginTop: 5}]}>No apikey? Get it at thingspeak</Text>
                                                    </TouchableOpacity>      
                                                    </View>            
                                            </KeyboardAvoidingView>
                                      
                                     
                                    
                                              
                                          


                            </Image>
                            </Animated.View>
                    
            
        );
    }
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  
  
   heading: {
        //borderBottomWidth: 1,
        //borderBottomColor: 'white'
        backgroundColor:'transparent',
        //padding: 5
    },
   
    headingText: {
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
    },
    input: {
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius:2,
        margin: 5,
        padding: 5,
        height: 40
    },
    button: {
        alignSelf: 'stretch',
        //backgroundColor: 'transparent'
        margin: 5,
    },
    backgroundpic: {
            flex: 1,
            width: undefined,
            height: undefined,
            alignSelf: 'stretch',

            flexDirection: 'column',
            flexWrap: 'wrap',
           // opacity: 0.7
    },  
  
  
   card: {
        flex: 1,
        alignSelf: 'stretch',
        padding: 10,
        margin:10,
        backgroundColor: '#ffffff',
        borderRadius: 3,
        borderColor: 'lightgrey',
        borderWidth: 1,
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 2,
        },
     },
});
//make this component available to the app
export default TsInit;