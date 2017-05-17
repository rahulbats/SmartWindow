//import liraries
import React, { Component } from 'react';
import { View, RefreshControl, Alert, Text, StyleSheet, TextInput, ListView , ActivityIndicator, TouchableOpacity, Image} from 'react-native';
import styles from '../../stylesheet/styles';
import {observer } from "mobx-react/native";
import windowsStore from '../../stores/list/list-store';
import addStore from '../../stores/list/add/add-store';
import detailsStore from '../../stores/details/details-store';
import addressStore from '../../stores/list/add/address/address-store';
import initStore from '../../stores/tsinit/tsinit-store';
import indoorStore  from "../../stores/details/indoor/indoor-store";
import outdoorStore  from "../../stores/details/outdoor/outdoor-store";
import desiredStore  from "../../stores/details/desired/desired-store";
import smartStore  from "../../stores/details/smart/smart-store";
import statusStore  from "../../stores/details/status/status-store";
import { Client } from 'react-native-paho-mqtt';

@observer
class WindowList extends Component {
   
  renderRow(rowData, sectionID, rowID) {
      return (
        <View>
        <View 
                  underlayColor={ "#fff" } style={ [styles.card , {marginBottom:2, marginTop:2} ]}>

                 <View style={{flex:1, flexDirection:'row'}}> 
                  <TouchableOpacity style={{flex:2, flexDirection:'column'}} onPress={() => this.gotoDetails(rowData.id, rowData.key)}>
                    <Text style={{padding: 10, flex:1, alignSelf: 'flex-start'}}>{ rowData.name.toUpperCase() }</Text>
                    <Text style={{paddingLeft: 10, color:'grey'}}>ID: { rowData.id }</Text>
                  </TouchableOpacity>    
                   <View style={{flex:1,alignItems:'flex-end',flexDirection:'row'}}>
                    <TouchableOpacity  onPress={() => this.gotoEdit(rowData)}>
                      <Image  source={require('../../images/pencil-icon.png')} style={{flex:1, height:30, width:30, marginTop:10}} resizeMode='contain'/>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => this.deleteWindow(rowData)}>  
                      <Image  source={require('../../images/trashcan.png')} style={{flex:1,alignSelf:'flex-end', height:50, width:50, marginTop:10, marginLeft: 30}} resizeMode='contain'/>
                    </TouchableOpacity>
                   </View> 
                 </View> 
        </View>
        </View>
         
      );
  }

 gotoEdit =(rowData) => {
      addStore.setId(rowData.id)
      addStore.setName(rowData.name);
      addStore.setDescription(rowData.description);
      addressStore.setLatitude(rowData.latitude);
      addressStore.setLongitude(rowData.longitude);
      this.props.navigator.push( {
                    name: "add",
                    title: "Update Window",
                    passProps: {
                        type: "Scene"
                    }
                }
              ); 
 };

 deleteWindow =(rowData) => {
      Alert.alert(
                    'Delete Window?',
                    'This will permanently delete the window data. Are you sure?',
                        [
                            {text: 'OK', onPress: () => windowsStore.deleteWindow(rowData.key)},
                            {text: 'CANCEL', onPress: () => console.log('cancel called')}
                        ]
                    );
 };

  gotoDetails = (id, key) => {
      detailsStore.id = id;
      detailsStore.key = key;
      this.props.navigator.push( {
                name: "details",
                title: "Window Detail",
                passProps: {
                    type: "Modal"
                }
            }
        );
  };


  connectMQTT= () => {
        // connect the client 
        console.log(windowsStore.client.isConnected());
        if(!windowsStore.client.isConnected()) {
                windowsStore.client.connect({
                    userName: initStore.username,
                    password: initStore.aioKey,
                    keepAliveInterval: 60000,
                    cleanSession:true
                })
                .then(() => {
                    // Once a connection has been made, make a subscription and send a message. 
                    console.log('onConnect');
                    return windowsStore.client.subscribe(initStore.username + '/throttle');
                    //return client.subscribe('World');
                })
                .catch((responseObject) => {
                    if (responseObject.errorCode !== 0) {
                      console.log(responseObject);
                      setTimeout(()=>this.connectMQTT(), 5000);
                    }
                });
        }       
    };

    setUpMQTT() {
        const myStorage = {
            setItem: (key, item) => {
                myStorage[key] = item;
            },
            getItem: (key) => myStorage[key],
            removeItem: (key) => {
                delete myStorage[key];
            },
        };
        // Create a client instance 
        windowsStore.client = new Client({ uri: 'wss://io.adafruit.com:443/mqtt/', clientId: "smart_window_phone" + parseInt(Math.random() * 100, 10), storage: myStorage });
        
        windowsStore.client.on('connectionLost', (responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.log(responseObject.errorMessage);
                console.log('onConnectionLost: error code' + responseObject.errorCode);
            }
            this.connectMQTT();
        });
        windowsStore.client.on('messageReceived', (message) => {
            console.log(message.destinationName);
            if(message.destinationName===(initStore.username + '/throttle')) {
              console.log(message);
            } else {
                var payload = message.payloadString;
                var values = payload.split('_');
                indoorStore.setIndoorTemp(Number(values[0]));
                outdoorStore.setOutdoorTemp(Number(values[1]));
                desiredStore.setDesired(Number(values[2]));
                statusStore.setOpen (values[3]==="1"?true:false);
                smartStore.setSmart (values[4]==="1"?true:false);
            }
            
        });
              
   }

  componentWillMount() {
    windowsStore.loadWindows();
    this.setUpMQTT();
    this.connectMQTT(); 
  }

  render() {
    const { windows } = windowsStore;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(windows.slice());
    
    
    return (
       <View style={styles.container}>
         <View style={styles.heading}>
                
               {/*windowsStore.isLoading &&
               <ActivityIndicator
                  animating={true}
                  style={[stylesLocal.centering, {height: 80}]}
                  size="large"
                  color="#00aa00"
                />
               */}
               <Text style={[styles.headingText,styles.text]}>Here are the list of your windows. Connect to one to control it.</Text>
          </View>
         
         
          <ListView 
          refreshControl = {
               <RefreshControl
                refreshing={windowsStore.isLoading}
                onRefresh={()=>windowsStore.loadWindows()}
                tintColor="#ff0000"
                title="Loading..."
                titleColor="#00ff00"
                colors={['#ff0000', '#00ff00', '#0000ff']}
                //progressBackgroundColor="#ffff00"
              />
          }
          enableEmptySections={true} dataSource={ dataSource } renderRow={this.renderRow.bind(this)} style={{flex:3,alignSelf: 'stretch'}}></ListView>
        
         
          
    
          

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
