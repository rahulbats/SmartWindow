//import liraries
import React, { Component } from 'react';
import { View,KeyboardAvoidingView, Text, StyleSheet, TextInput, Button , ActivityIndicator, TouchableOpacity} from 'react-native';
import styles from '../../../stylesheet/styles';
import {observer } from "mobx-react/native";
import addStore from '../../../stores/list/add/add-store';

@observer
class Add extends Component {
  

  componentWillMount() {
    const apiKey = this.props.apiKey;
    
  }

  render() {
    const { name, description, latitude, longtitude } = addStore;
 

    return (
       <KeyboardAvoidingView style={[styles.container]}>
        
          <TextInput
              style={[styles.input,{flex:1, height:10}]}
              onChangeText={(text)=>addStore.setName(text)}
              value={name}
              placeholder="Window Name"
              maxLength={20}
          />
         
         <TextInput
                style={[styles.input,{flex:2}]}
                onChangeText={(text)=>addStore.setDescription(text)}
                value={description}
                placeholder="Window Description"
                multiline = {true}
                numberOfLines = {4}
            />   
         
         <KeyboardAvoidingView behavior={'padding'} style={{ flex:1,flexDirection:'row'}}>
            <TextInput
              style={[styles.input, {height:60}]}
              onChangeText={(text)=>addStore.setLatitude(text)}
              value={latitude}
              placeholder="Latitude"
              keyboardType = "numeric"
              maxLength={6}
            />
          <TextInput
                  style={[styles.input, {height:60}]}
                  onChangeText={(text)=>addStore.setLongitude(text)}
                  value={longtitude}
                  placeholder="Longitude"
                  keyboardType = "numeric"
                  maxLength={6}
              />   
         </KeyboardAvoidingView>
         <Text style={{flex:1, marginTop:20}}> OR </Text>
         <View behavior={'padding'} style={{flex:1, alignSelf:'stretch'}}>
          <TextInput
                    style={[styles.input,{alignSelf:'stretch'}]}
                    placeholder="Window Address"
                />   
         </View>
         
            <Button
              onPress = {()=>console.log('button clocked')}
              title="Save"
              color="#16a085"
              accessibilityLabel="Save window information"
              />  
        <View style={{flex:2}}/>
        </KeyboardAvoidingView>
        
    );
  }
}




//make this component available to the app
export default Add;
