import {observable, action, computed} from "mobx"
import indoorStore  from "./indoor/indoor-store";
import outdoorStore  from "./outdoor/outdoor-store";
import desiredStore  from "./desired/desired-store";
import smartStore  from "./smart/smart-store";
import statusStore  from "./status/status-store";
import initStore from '../tsinit/tsinit-store';
import windowsStore from '../list/list-store';

import {Message} from 'react-native-paho-mqtt';
class DetailsStore {
    @observable unit = 'C';
    @observable group;
    id;
    key;

    @action setUnit(value) {
		  return this.unit = value ;
	  }  

    @action setGroup(value) {
		  return this.group = value ;
	  }  
  

     sendMessage(id) {
         var feedString = indoorStore.getIndoorTemp+'_'+outdoorStore.getOutdoorTemp+
                            '_'+desiredStore.getDesiredTemp+
                            '_'+(statusStore.open?'1':'0')+
                            '_'+(smartStore.smart?'1':'0');
         const message = new Message(feedString);
         message.destinationName = initStore.username + '/feeds/'+id;
         windowsStore.client.send(message);                    
     } 
   
}
var detailsStore = new DetailsStore;

export default detailsStore;