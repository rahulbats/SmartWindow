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
  Button,
  TouchableOpacity,
  Image
} from 'react-native';
import TsInit from './src/components/tsinit/tsinit';
import initStore from './src/stores/tsinit/tsinit-store';
import WindowList from './src/components/list/list';
import Add from './src/components/list/add/add';
import Address from './src/components/list/add/address/address';
import Details from './src/components/details/details';
import styles from './src/stylesheet/styles';

export default class SmartWindow extends Component {
  renderScene (route, navigator) {
    if(route.name == 'windowlist') {
     return <WindowList navigator={navigator} {...route.passProps} />
   }
   if(route.name == 'tsinit') {
     return <TsInit navigator={navigator} {...route.passProps} />
   }
    else if(route.name == 'details') {
     return <Details navigator={navigator} {...route.passProps} />
   }
    else if(route.name == 'add') {
     return <Add navigator={navigator} {...route.passProps} />
   }
    else if(route.name == 'address') {
     return <Address navigator={navigator} {...route.passProps} />
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
       
              <TouchableOpacity onPress={() => { if (index > 0) { navigator.pop() } }}>
                <Image
                    source={require('./src/images/arrow-left.png')}
                    resizeMode={'contain'} style={{height:40,width:40}}
                     />
               </TouchableOpacity>     

          );
       
    } 
    else { return null }
     
  },
  Title: function( route, navigator, index, navState ){
     if(route.name == 'address') {
        return(
            <TextInput
                value={''}
                placeholder="Window Address"
            />   
        );
     } else {
        return(
          <Text style={[styles.navBarText, styles.navBarTitleText]}>{ route.title }</Text>
        );
     }
    
  },
  RightButton: function( route, navigator, index, navState ){
    if(route.name == 'windowlist') {
      return (
          <Button
              onPress={() => { navigator.push( {
                    name: "add",
                    title: "Add Window",
                    passProps: {
                        type: "Modal"
                    }
                }
              ) }}
              title="Add"
              color="#3498db"
              style={{height:20}}
              accessibilityLabel="Add a window"
              />  
      );
    }
  }
}


AppRegistry.registerComponent('SmartWindow', () => SmartWindow);
