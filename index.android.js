/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Button
} from 'react-native';
import TsInit from './src/components/tsinit/tsinit';
import initStore from './src/components/tsinit/tsinit-store';
import WindowList from './src/components/list/list';
import styles from './src/stylesheet/styles';

export default class SmartWindow extends Component {
  renderScene (route, navigator) {
    if(route.name == 'windowlist') {
     return <WindowList navigator={navigator} {...route.passProps} />
   }
   if(route.name == 'tsinit') {
     return <TsInit navigator={navigator} {...route.passProps} />
   }
   
  }
  configureScene (route, routeStack) {
    if (route.type === 'Modal') {
      return Navigator.SceneConfigs.FloatFromBottom
    }
    return Navigator.SceneConfigs.PushFromRight
  }
  


  render () {
    return (
      <Navigator
        configureScene={this.configureScene.bind(this)}
        renderScene={this.renderScene.bind(this)}
        initialRoute={{
          name: 'tsinit',
          title: 'Connect to thingspeak',
          passProps: {
            store: initStore
          }
        }}
        navigationBar={
          <Navigator.NavigationBar 
            routeMapper={ NavigationBarRouteMapper } 
            style = {styles.navigationBar}
            navigationStyles={Navigator.NavigationBar.StylesIOS}
          />
        } 
        
         />
        
    )
  }
}
var NavigationBarRouteMapper = { 
  LeftButton: function( route, navigator, index, navState ){
    
   if(index > 0) {
      return (
       <Button
          color="#841584"
          onPress={() => { if (index > 0) { navigator.pop() } }}
          title="back"/>
          );
         
    } 
    else { return null }
     
  },
  Title: function( route, navigator, index, navState ){
    return(
      <Text style={[styles.navBarText, styles.navBarTitleText]}>{ route.title }</Text>
    )
  },
  RightButton: function( route, navigator, index, navState ){
    return(
      <Text>{ route.rightButton }</Text>
    )
  }
}


AppRegistry.registerComponent('SmartWindow', () => SmartWindow);
