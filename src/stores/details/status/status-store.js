import {observable, action, computed} from "mobx"
import { Alert } from 'react-native';
class StatusStore {
    @observable open = true;
    @observable pendingStatusRequestCount = 0;
    @observable displayError = false;
  
    @computed get isStatusLoading() {
     return this.pendingStatusRequestCount > 0;
	}

  @action setDisplayError(value) {
      displayError = value;
  }

  @action loadStatus(id,apiKey) {
        this.pendingStatusRequestCount++;
         fetch('https://api.thingspeak.com/channels/'+id+'/fields/2/last.json?api_key='+apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                this.open = responseJson.field2==="0"?false:true;
                this.pendingStatusRequestCount--;
            })
            .catch((error) => {
                console.error(error);
            });
  }

  
  @action setStatus(value, apiKey) {
      this.pendingStatusRequestCount++;
        fetch("https://api.thingspeak.com/update", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key:apiKey,
                field2:value?1:0
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if(data===0){
                this.open = !value ;
                Alert.alert(
                    'Thingspeak returned error',
                    'You might be updating too quickly. Thingspeak allows 1 update per 15 seconds for free accounts.',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                );
            } else {
                this.open = value ;
                //this.displayError = false;
            }
            this.pendingStatusRequestCount--;
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
var statusStore = new StatusStore;

export default statusStore;