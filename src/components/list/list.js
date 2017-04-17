//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ListView , ActivityIndicator} from 'react-native';
import styles from '../../stylesheet/styles';
import {observer } from "mobx-react/native";
@observer
class WindowList extends Component {
    
constructor() {
    super();
  
    
  }

  render() {
    const { windows } = this.props.store;
    //windows.loadWindows();
    /*const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(windows),
    };*/
    return (
       <View style={styles.container}>
         <View style={styles.heading}>
                
               {this.props.store.isLoading &&
               <ActivityIndicator
                  animating={true}
                  style={[stylesLocal.centering, {height: 80}]}
                  size="large"
                  color="#00aa00"
                />
               }
               <Text style={[styles.headingText,styles.text]}>Here are the list of your windows. Connect to one to control it. </Text>
          </View>
          
          {!this.props.store.isLoading &&!windows.length ? <NoList /> : null}
          <View style={{flex:1, alignSelf:'stretch',alignItems: 'center'}}>
            {windows.map((l, i) => {
              return <View key={i} style={stylesLocal.itemContainer}>
                <Text
                  style={stylesLocal.item}>{l.name.toUpperCase()}</Text>
                
              </View>
            })}
          </View>
        </View>
    );
  }
}


const NoList = () => (
  <View style={styles.noList}>
    <Text style={styles.noListText}>No List, Add List To Get Started</Text>
  </View>
)




const stylesLocal = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
    height: 60,
    alignSelf: 'stretch',
    flexDirection:'row',
    paddingLeft: 10
  },
  item: {
    color: 'white',
    fontSize: 18,
    
  },
  deleteItem: {
    flex: 1,
    padding: 20,
    color: '#a3a3a3',
    fontWeight: 'bold',
    marginTop: 3
  },
  button: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#156e9a'
  },
  buttonText: {
    color: '#156e9a',
    fontWeight: 'bold'
  },
  noList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noListText: {
    fontSize: 22,
    color: '#156e9a'
  },
})


//make this component available to the app
export default WindowList;
