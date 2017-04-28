import {observable, action, computed} from "mobx"
import { Alert } from 'react-native';
class AwayStore {
    @observable away = false;
    @observable pendingRequestCount = 0;
    
  
    @computed get isLoading() {
     return this.pendingRequestCount > 0;
	}

 

  @action loadAway(id,apiKey) {
        this.pendingRequestCount++;
         this.away = false;
         fetch('https://api.thingspeak.com/channels/'+id+'/fields/6/last.json?api_key='+apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                this.away = responseJson.field6==="0"?false:true;
                this.pendingRequestCount--;
            })
            .catch((error) => {
                console.error(error);
            });
  }

  
  @action setAway(value , apiKey) {
		this.pendingStatusRequestCount++;
        fetch("https://api.thingspeak.com/update", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key:apiKey,
                field6:value?1:0
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if(data===0){
                this.away = !value ;
                Alert.alert(
                    'Thingspeak returned error',
                    'You might be updating too quickly. Thingspeak allows 1 update per 15 seconds for free accounts.',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                );
            } else {
                this.away = value ;
                //this.displayError = false;
            }
            this.pendingRequestCount--;
        })
        .catch((error) => {
                console.error(error);
                Alert.alert(
                    'Thingspeak returned error',
                    'You might be updating too quickly. Thingspeak throttles free accounts.',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                );
            });
 
	}  
   
}
var awayStore = new AwayStore;

export default awayStore;