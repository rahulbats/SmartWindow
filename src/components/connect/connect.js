//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';


// create a component
class Connect extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                
                <View>
                        
                        <Text style={styles.heading}>Connect to Thingspeak</Text>
                        
                        <TextInput style={styles.input}/>
                        
                        <TextInput style={styles.input}/>
                </View>
                
                
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    /*input: {
        flex:0,
        height:40,
        width:200,
        backgroundColor: 'red',
        marginBottom: 20
    }*/
});

//make this component available to the app
export default Connect;
