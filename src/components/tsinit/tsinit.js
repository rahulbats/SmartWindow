//import liraries
import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, 
    TextInput, Button, Image, Keyboard, 
    AsyncStorage, Dimensions, Animated , KeyboardAvoidingView,
    Easing, FadeInView, Linking, TouchableOpacity
} from 'react-native';
import {observer } from "mobx-react/native";
import {WindowList} from "../list/list";
import initStore  from "../../stores/tsinit/tsinit-store";
//import styles from '../../stylesheet/styles';
@observer
class TsInit extends Component {
    
    updateUsername ( value) {
        initStore.setUsername (value);
    }
    updateKey ( value) {
        initStore.setAioKey (value);
    }
    constructor(){
        super();
        this.state = {
            fadeAnim: new Animated.Value(0),
        };
        
    }
    async retrieveUserInfo(){
        try {
            const key = await AsyncStorage.getItem('aioKey');
            const username = await AsyncStorage.getItem('username');
            if (key !== null && username !== null){
                // We have data!!
                initStore.setAioKey (key);
                initStore.setUsername (username);
                this.gotoList();
            }
        } catch (error) {
        // Error retrieving data
        }
    }
    async saveUserInfo(apiKey, username){
        Keyboard.dismiss(); 
        try {
            await AsyncStorage.setItem('aioKey', apiKey);
            await AsyncStorage.setItem('username', username);
        } catch (error) {
        // Error saving data
        }
        this.gotoList();
    }
     gotoList(){
        //windowsStore.loadWindows(apiKey);
        
        this.props.navigator.push( {
                name: "windowlist",
                title: "Windows List",
                passProps: {
                    type: "Modal"
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
        this.retrieveUserInfo();
    }

    render() {
        
        
        const { aioKey, username } = initStore
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
                                                    onChangeText={(text)=>this.updateUsername(text)}
                                                    value={username}
                                                    placeholder="Adafruit username"
                                                    maxLength={20}
                                                    underlineColorAndroid={'transparent'}
                                                />
                                                <TextInput
                                                    style={styles.input}
                                                    onChangeText={(text)=>this.updateKey(text)}
                                                    value={aioKey}
                                                    placeholder="Adafruit AIO key"
                                                    maxLength={100}
                                                    underlineColorAndroid={'transparent'}
                                                />    

                                                   <View style={styles.button}>
                                                    <Button
                                                        onPress = {()=>this.saveUserInfo(aioKey, username)}
                                                        title="Connect"
                                                        color="green"
                                                        accessibilityLabel="Connect to io.adafruit"
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