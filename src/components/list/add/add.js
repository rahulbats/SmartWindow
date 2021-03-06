//import liraries
import React, { Component } from 'react';
import { Alert, Platform, Picker,View,KeyboardAvoidingView, Text, StyleSheet, TextInput, Button , ActivityIndicator, TouchableOpacity} from 'react-native';
import styles from '../../../stylesheet/styles';
import {observer } from "mobx-react/native";
import addStore from '../../../stores/list/add/add-store';
import initStore from '../../../stores/tsinit/tsinit-store';
import windowsStore from '../../../stores/list/list-store';
import addressStore from '../../../stores/list/add/address/address-store';
const Item = Picker.Item;

@observer
class Add extends Component {
  
   isValid() {
        var errorString = '';
        if( addStore.name === '' || addStore.name === null ) {
            errorString = 'Name is mandatory. \n';
        }
        /*if (addressStore.latitude === '' || addressStore.latitude === null ) {
            errorString = errorString + 'Latitude is mandatory. \n';
        } else {
          const latitudeNumber = Number(addressStore.latitude);
          if(latitudeNumber<90 || latitudeNumber>90) {
            errorString = errorString + 'Latitude should be between -90  and +90. \n';
          }
        }
        if (addressStore.longitude === '' || addressStore.longitude === null ) {
            errorString = errorString + 'Longitude is mandatory. \n';
        } else {
            const longitudeNumber = Number(addressStore.longitude);
            if(longitudeNumber<90 || longitudeNumber>90) {
              errorString = errorString + 'Longitude should be between -180  and +180. \n';
            }
        }*/

        return errorString;
    }

  
  render() {
    const { name, description } = addStore;
    const { query, latitude, longitude} = addressStore;
    const { apiKey } = initStore;
    return (
       <KeyboardAvoidingView style={[styles.container]}>
          <Text style={{alignSelf: 'flex-start', padding: 5, marginLeft: 5}}>Name</Text>
          <TextInput
              style={[styles.input,{flex:1}]}
              onChangeText={(text)=>addStore.setName(text)}
              value={name}
              placeholder="Window Name"
              maxLength={20}
              returnKeyType={"next"}
              onSubmitEditing={() => this.refs['SecondInput'].focus()}
          />
         <Text style={{alignSelf: 'flex-start', padding: 5, marginLeft: 5}}>Description</Text>
         <TextInput
                
                style={[styles.input,{flex:1.2,textAlignVertical: 'top'}]}
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
              style={[styles.input, { marginLeft:10, marginRight:5}]}
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
                  style={[styles.input, { marginLeft:5, marginRight: 10}]}
                  onChangeText={(text)=>addressStore.setLongitude(text)}
                  value={longitude}
                  placeholder="Longitude"
                  keyboardType = {Platform.OS==='ios'? "numbers-and-punctuation":"numeric"}
                  returnKeyType={"done"}
                  maxLength={6}
                  
              />  
          </View>     
         </View>
         <Text style={{flex:0.5}}> OR </Text>

         <View behavior={'padding'} style={{flex:2, alignSelf:'stretch'}}>
          <Text style={{alignSelf: 'flex-start', padding: 5, marginLeft: 5}}>Address</Text>
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
                const validationErrors = this.isValid();
                if( validationErrors === '') {
                    if(addStore.id!=null)
                      addStore.updateChannel();
                    else
                      addStore.addChannel();
                    
                    this.props.navigator.pop();  
                } else {
                    Alert.alert(
                            'Window information is not valid',
                            validationErrors,
                            [
                                {text: 'OK', onPress: () => console.log('OK Pressed!')},
                            ]
                        );
                }
                 
                
                }}
              title="Save"
              color="#16a085"
              accessibilityLabel="Save window information"
              />  
        <View style={{flex:4}}/>
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
