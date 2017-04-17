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
    input: {
        height:40,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 20
    }
});

//make this component available to the app
export default Connect;
