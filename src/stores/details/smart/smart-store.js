import {observable, action, computed} from "mobx"
import { Alert } from 'react-native';
class SmartStore {
    @observable smart = true;
    @observable isLoading = false;
   
   @action setLoading(value) {
      this.isLoading = value;
    }

    @action setSmart(value) {
        this.smart = value;
    }

  

  
  @action changeSmart(value , apiKey) {
		this.pendingStatusRequestCount++;
        fetch("https://api.thingspeak.com/update", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key:apiKey,
                field5:value?1:0
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if(data===0){
                this.smart = !value ;
                Alert.alert(
                    'Thingspeak returned error',
                    'You might be updating too quickly. Thingspeak allows 1 update per 15 seconds for free accounts.',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                );
            } else {
                this.smart = value ;
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
var smartStore = new SmartStore;

export default smartStore;