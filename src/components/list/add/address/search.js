//import liraries
import React, { Component } from 'react';
import { View,ListView,KeyboardAvoidingView, Text, StyleSheet, TextInput, Button , ActivityIndicator, TouchableOpacity} from 'react-native';
import styles from '../../../../stylesheet/styles';
import {observer } from "mobx-react/native";
import addressStore from '../../../../stores/list/add/address/address-store';

@observer
class Search extends Component {
  
 
  render() {
    const { query } = addressStore;
    
     return (
       <TextInput
                value={query}
                onChangeText={(value)=>addressStore.setQuery(value, true)}
                style={{marginLeft:45, 
                        marginBottom: 10,borderRadius:10,
                        flex:1, alignSelf:'stretch',
                        paddingLeft: 15, marginRight: 20, 
                        backgroundColor: '#f1f1f1',}}
                placeholder="Window Address"
                autoFocus= {true}
            />   
     );
  }
}
//make this component available to the app
export default Search;