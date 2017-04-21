//import liraries
import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, 
    TextInput, Button, Image, Keyboard, 
    AsyncStorage, Dimensions, Animated , 
    Easing, FadeInView
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
            duration: 5000,
        }                              
        ).start();                             // Starts the animation
    }

    render() {
        this.retrieveApiKey();
        
        const { apiKey } = this.props.store
        return (
                            <Animated.View                            // Special animatable View
                                style={{flex:.8,opacity: this.state.fadeAnim}}>
                            
                            <StatusBar
                                backgroundColor="blue"
                                barStyle="light-content"
                                hidden={true}
                            />         
                            <Image style={styles.backgroundpic} source={require('../../images/window-photo.jpeg')} resizeMode='stretch'>
                                     <View style={{flex:2}}></View>  
                                     <Image style={{flex:1,alignSelf:'center'}} source={require('../../images/Logo.png')} resizeMode='contain'/>
                                     <View style={styles.heading}>

                                                <Text style={styles.headingText}>Welcome to SmartWindow.</Text>
                                                 <Text style={styles.headingText}>Connect to thingspeak using your apikey.</Text>
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
                                                    
                                                        
                                                    </View>            
                                            </View>
                                      
                                     
                                    
                                              
                                          


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
        padding: 5
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
        marginBottom: 20,
        borderRadius:2,
        margin: 10,
        padding: 10,
        height: 40
    },
    button: {
        alignSelf: 'stretch',
        //backgroundColor: 'transparent'
        margin: 10,
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