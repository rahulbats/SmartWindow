//import liraries
import React, { Component } from 'react';
import { Platform, Picker,View,KeyboardAvoidingView, Text, StyleSheet, TextInput, Button , ActivityIndicator, TouchableOpacity} from 'react-native';
import styles from '../../../stylesheet/styles';
import {observer } from "mobx-react/native";
import addStore from '../../../stores/list/add/add-store';
import initStore from '../../../stores/tsinit/tsinit-store';
import windowsStore from '../../../stores/list/list-store';
import addressStore from '../../../stores/list/add/address/address-store';
const Item = Picker.Item;

@observer
class Add extends Component {
  

  
  render() {
    const { name, description } = addStore;
    const { query, latitude, longitude} = addressStore;
    const { apiKey } = initStore;
    return (
       <KeyboardAvoidingView style={[styles.container]}>
          <Text style={{alignSelf: 'flex-start', padding: 5}}>Name</Text>
          <TextInput
              style={[styles.input,{flex:1, height:10}]}
              onChangeText={(text)=>addStore.setName(text)}
              value={name}
              placeholder="Window Name"
              maxLength={20}
              returnKeyType={"next"}
              onSubmitEditing={() => this.refs['SecondInput'].focus()}
          />
         <Text style={{alignSelf: 'flex-start', padding: 5}}>Description</Text>
         <TextInput
                
                style={[styles.input,{flex:1.5,textAlignVertical: 'top'}]}
                onChangeText={(text)=>addStore.setDescription(text)}
                value={description}
                placeholder="Window Description (Optional)"
                multiline = {true}
                numberOfLines = {3}
                
            />   
        
         <View behavior={'padding'} style={{ flex:2,flexDirection:'row'}}>
           <View style={{ flex:1,flexDirection:'column'}}>
            <Text style={{padding: 5, marginLeft: 5}}>Latitude</Text> 
            <TextInput
              ref='SecondInput'
              style={[styles.input, {height:60, marginLeft:10, marginRight:5}]}
              onChangeText={(text)=>addressStore.setLatitude(text)}
              value={latitude}
              placeholder="Latitude"
              keyboardType = {Platform.OS==='ios'? "numbers-and-punctuation":"numeric"}
              returnKeyType={"done"}
              maxLength={6}
              returnKeyType={"next"}
              onSubmitEditing={() => this.refs['ThirdInput'].focus()}
            />
           </View>

          <View style={{ flex:1,flexDirection:'column'}}>
          <Text style={{padding: 5}}>Longitude</Text> 
          <TextInput
                  ref='ThirdInput'
                  style={[styles.input, {height:60, marginLeft:5, marginRight: 10}]}
                  onChangeText={(text)=>addressStore.setLongitude(text)}
                  value={longitude}
                  placeholder="Longitude"
                  keyboardType = {Platform.OS==='ios'? "numbers-and-punctuation":"numeric"}
                  returnKeyType={"done"}
                  maxLength={6}
                  
              />  
          </View>     
         </View>
         <Text style={{flex:1, marginTop:20}}> OR </Text>

         <View behavior={'padding'} style={{flex:2, alignSelf:'stretch'}}>
          <Text style={{alignSelf: 'flex-start', padding: 5}}>Address</Text>
          <TextInput
                    style={[styles.input,{alignSelf:'stretch'}]}
                    placeholder="Window Address"
                    value={query}
                    onFocus={()=>{
                      this.props.navigator.push( {
                              name: "address",
                              title: "Window Address",
                              passProps: {
                                  type: "Bottom"
                              }
                          }
                      );
                    }}
                />   
         </View>
         
            <Button
              onPress = {()=>{
                if(addStore.id!=null)
                  addStore.updateChannel();
                else
                  addStore.addChannel();
                
                this.props.navigator.pop();  
                }}
              title="Save"
              color="#16a085"
              accessibilityLabel="Save window information"
              />  
        <View style={{flex:2}}/>
        </KeyboardAvoidingView>
        
    );
  }
}


const stylesLocal = StyleSheet.create({
  picker: {
    width: 10,
    flex:1,
    margin:-10
  },
});

//make this component available to the app
export default Add;
