import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Switch, 
    ActivityIndicator,
    NetInfo,
    TouchableOpacity,
    Image
 } from 'react-native';
import {observer } from "mobx-react/native";
import styles from '../../../stylesheet/styles';
import statusStore  from "../../../stores/details/status/status-store";
import TimerMixin from 'react-timer-mixin';


@observer
class Status extends Component {
    mixins: [TimerMixin];
    connectionInfo =  null;
   

   componentWillMount() {
    const id = this.props.id;   
    const apiKey = this.props.readApiKey;
    this.loadStatus(id,apiKey, true);
  }

  componentDidMount() {
      const id = this.props.id;   
      const apiKey = this.props.readApiKey;
      
      setInterval(()=>this.loadStatus(id,apiKey),15000);
      NetInfo.addEventListener(
            'change',
            this._handleConnectionInfoChange
        );
        NetInfo.fetch().done(
            (connectionInfo) => { this.connectionInfo = connectionInfo; }
        );
   }

   loadStatus(id,apiKey) {
         fetch('https://api.thingspeak.com/channels/'+id+'/fields/2/last.json?api_key='+apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                statusStore.setOpen (responseJson.field2==="0"?false:true) ;
                statusStore.setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
  }

  _handleConnectionInfoChange = (connectionInfo) => {
    this.connectionInfo = connectionInfo;
  };

  componentWillUnmount() {
    NetInfo.removeEventListener(
        'change',
        this._handleConnectionInfoChange
    );
  }

  setStatus = (value) => {
    

    if(this.connectionInfo==='wifi') {
        var ipaddressPromise = statusStore.getIpAddressOfESP(this.props.id,  this.props.readApiKey);
        console.log(this.connectionInfo);
        ipaddressPromise
               .then((response) => response.json())
                    .then((responseJson) => { 
                              var ipAddress = responseJson.field6;
                              return statusStore.setStatusLocal(ipAddress, value)
                                            .catch((error)=>{
                                                console.log('Local update failed will try remote');
                                                //local failed (may be not in wifi lets try remote)
                                                return statusStore.setStatusRemote(this.props.id, value, this.props.writeApiKey)
                                                    .catch(console.log(error));
                                            });
                    })
                .catch((error)=>console.log(error));   
    } else {
        statusStore.setStatusRemote(this.props.id, value, this.props.writeApiKey)
             .catch(console.log(error));
    }
    
  };


  showErrorAlert = () => {
    Alert.alert(
            'Thingspeak returned error',
            'You might be updating too quickly. Thingspeak allows 1 update per 15 seconds for free accounts.',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
        );
  };

    render() {
        const apiKey  = this.props.writeApiKey;
        const id = this.props.id;
        const { open } = statusStore;
        const unit ="C";
        
        return (
                     
                    <View style={[styles.card,{flex: 1, flexDirection: 'row'}]}>   
                                
                                <Text  style={{flex:2}}>{open?"window is open":"Window is closed"}</Text>  
                                      
                                {statusStore.isStatusLoading ?
                                                <ActivityIndicator
                                                    animating={true}
                                                    style={{height: 80}}
                                                    size="large"
                                                    color="#00aa00"
                                                    />
                                                :  
                                <Switch
                                    onValueChange={(value) => {
                                                  this.setStatus(value);
                                            }
                                        }
                                    style={{marginBottom: 10,flex:1}}
                                    value={open} /> 
                                }
                            </View>            
        );
    }

   
}



//make this component available to the app
export default Status;
