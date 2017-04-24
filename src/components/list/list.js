//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ListView , ActivityIndicator, TouchableOpacity} from 'react-native';
import styles from '../../stylesheet/styles';
import {observer } from "mobx-react/native";
import windowsStore from '../../stores/list/list-store';

@observer
class WindowList extends Component {
   
  renderRow(rowData, sectionID, rowID) {
      return (
        <View>
        <TouchableOpacity 
                  underlayColor={ "#fff" } style={ [styles.card , {marginBottom:2, marginTop:2} ]}  onPress={() => this.gotoDetails(rowData.id, rowData.readApiKey, rowData.writeApiKey)}>

                 
                    <Text style={{padding: 10}}>{ rowData.name.toUpperCase() }</Text>
                    
              
   

        </TouchableOpacity>
        </View>
         
      );
  }

  gotoDetails = (id, readKey, writeKey) => {
      this.props.navigator.push( {
                name: "details",
                title: "Window Detail",
                passProps: {
                    type: "Modal",
                    id: id,
                    readApiKey: readKey,
                    writeApiKey: writeKey
                }
            }
        );
  };


  componentWillMount() {
    const apiKey = this.props.apiKey;
    //windowsStore.addWindow({name:'sdfdsf',readApiKey:'sdfsf', writeApiKey:'dsfsd'});
    windowsStore.loadWindows(apiKey);
  }

  render() {
    const { windows } = windowsStore;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(windows.slice());
    
    
    return (
       <View style={styles.container}>
         <View style={styles.heading}>
                
               {windowsStore.isLoading &&
               <ActivityIndicator
                  animating={true}
                  style={[stylesLocal.centering, {height: 80}]}
                  size="large"
                  color="#00aa00"
                />
               }
               <Text style={[styles.headingText,styles.text]}>Here are the list of your windows. Connect to one to control it.</Text>
          </View>
         
         
          <ListView enableEmptySections={true} dataSource={ dataSource } renderRow={this.renderRow.bind(this)} style={{flex:3,alignSelf: 'stretch'}}></ListView>
        
         
          
    
          

           {/*!windowsStore.isLoading &&!windows.length ? <NoList /> : null}
           {!windowsStore.isLoading && windows.length &&
           <View style={{flex:1, alignSelf: 'stretch', flexDirection:'row'}}>
         <ScrollView contentContainerStyle={styles.contentContainer}>
       
            {windows.map((l, i) => {
              return <TouchableOpacity key={i}
                  underlayColor={ "#aaa" } style={{ height:44}}  onPress={() => this.gotoDetails(l.id, l.readApiKey, l.writeApiKey)}>

                  <View style={stylesLocal.itemContainer}>
                    <Text style={{padding: 10}}>{ l.name.toUpperCase() }</Text>
                    <View style={{height:1, backgroundColor: '#dddddd'}}/>
        
                  </View>
   

              </TouchableOpacity>
            })}
   
          </ScrollView>
          </View>
           */}   
        </View>
    );
  }
}


const NoList = () => (
  <View style={styles.noList}>
    <Text style={styles.noListText}>No Window, Add Window To Get Started</Text>
  </View>
)




const stylesLocal = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  item: {
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
   mediaObject: {
   // flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  text: { flex: 1 },
})


//make this component available to the app
export default WindowList;
