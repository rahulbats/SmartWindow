//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ListView , ActivityIndicator, TouchableOpacity, ScrollView} from 'react-native';
import styles from '../../stylesheet/styles';
import {observer } from "mobx-react/native";
import windowsStore from './list-store';
var sampleArray =["livingroom", "bedroom", "sdff","sdfsfdfsf", "sdxcvxvxcv", "vfeferer", "vreergegfer","vvdvzsdcssdc", "vrrthrthrh", "ertertertt", "rrahul", "vdvdvdf", "werwrw", "vfdfvdfvd", "werwer", "sdasczczx", "rterttet"];

@observer
class WindowList extends Component {
    
constructor() {
    super();
   
   /*var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !=r2 })

   this.state = { 
        windowsDS: dataSource.cloneWithRows([]) 
     };*/
  }
  renderRow(rowData, sectionID, rowID) {
      return (
        <TouchableOpacity
          underlayColor={ "#aaa" } style={{ height:44}}>

         
            <View>
              <Text style={{padding: 10}}>{ rowData }</Text>
              <View style={{height:1, backgroundColor: '#dddddd'}}/>
  
            </View>
   

        </TouchableOpacity>

         
      );
  }

  render() {
    const { windows } = windowsStore;
    const apiKey = this.props.apiKey;
    windowsStore.addWindow("dfsdfsdf");
    //windowsStore.loadWindows(apiKey);
    
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
               <Text style={[styles.headingText,styles.text]}>Here are the list of your windows. Connect to one to control it. </Text>
          </View>
         
          {//<ListView dataSource={ this.state.windowsDS } renderRow={this.renderRow.bind(this)} style={{alignSelf: 'stretch'}}></ListView>}
          }
    
          

           {!windowsStore.isLoading &&!windows.length ? <NoList /> : null}
           <View style={{flex:1, alignSelf: 'stretch', flexDirection:'row'}}>
         <ScrollView contentContainerStyle={styles.contentContainer}>
       
            {windows.map((l, i) => {
              return <TouchableOpacity key={i}
                  underlayColor={ "#aaa" } style={{ height:44}}>

         
                  <View style={stylesLocal.itemContainer}>
                    <Text style={{padding: 10}}>{ l.toUpperCase() }</Text>
                    <View style={{height:1, backgroundColor: '#dddddd'}}/>
        
                  </View>
   

              </TouchableOpacity>
            })}
   
          </ScrollView>
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
