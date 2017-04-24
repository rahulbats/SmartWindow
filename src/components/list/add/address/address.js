//import liraries
import React, { Component } from 'react';
import { View,KeyboardAvoidingView, Text, StyleSheet, TextInput, Button , ActivityIndicator, TouchableOpacity} from 'react-native';
//import styles from '../../../stylesheet/styles';
import {observer } from "mobx-react/native";
//import addStore from '../../../../stores/list/add/address/address-store';

@observer
class Address extends Component {
  

  componentWillMount() {
    const apiKey = this.props.apiKey;
    
  }

  render() {
     return (
       <View/>
     );
  }
}
//make this component available to the app
export default Address;