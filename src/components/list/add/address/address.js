//import liraries
import React, { Component } from 'react';
import { View, ListView,KeyboardAvoidingView, Keyboard,Text, StyleSheet, TextInput, Button , ActivityIndicator, TouchableOpacity} from 'react-native';
import styles from '../../../../stylesheet/styles';
import {observer } from "mobx-react/native";
import addressStore from '../../../../stores/list/add/address/address-store';

@observer
class Address extends Component {
  
  populateLatLongAddress(lat, long , formatted_address){
      addressStore.setLatitude(lat);
      addressStore.setLongitude(long);
      addressStore.setQuery(formatted_address, false);

     this.props.navigator.push( {
                    name: "add",
                    title: "Add Window",
                    passProps: {
                        type: "Scene"
                    }
                }
              );    

  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var currentPosition = JSON.stringify(position);
        addressStore.setSuggestion([{formatted_address:'Current Location', geometry:{location:{lng:position.coords.longitude,lat:position.coords.latitude}}}]);
 
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    
  }

  renderRow(rowData, sectionID, rowID) {
      return (
        <View>
        <TouchableOpacity 
                  underlayColor={ "#fff" } style={  {flex:1,alignSelf: 'stretch', backgroundColor:'white'} }  
                  onPress={() => this.populateLatLongAddress(rowData.geometry.location.lat, rowData.geometry.location.lng,  rowData.formatted_address)}>

                 
                    <Text style={{padding: 20}}>{ rowData.formatted_address}</Text>
                    
              
                    <View style={{height:1, backgroundColor: 'gray'}}/>
                    
   

        </TouchableOpacity>
        </View>
         
      );
  }

  render() {
    const { suggestions } = addressStore;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(suggestions.slice());
    
     return (
       <View style={styles.container}>
         <ListView keyboardShouldPersistTaps="always" enableEmptySections={true} dataSource={ dataSource } renderRow={this.renderRow.bind(this)} style={{flex:3,alignSelf: 'stretch'}}></ListView>
       </View>
     );
  }
}
//make this component available to the app
export default Address;