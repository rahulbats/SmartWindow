import {observable, action, computed} from "mobx"
import { Alert } from 'react-native';
class StatusStore {
    @observable open = true;
    @observable isLoading = false;
    @observable displayError = false;
  
    @action setLoading(value) {
      this.isLoading = value;
    }

    @action setOpen(value) {
        this.open = value;
    }

  @action setDisplayError(value) {
      displayError = value;
  }

  
  @action getIpAddressOfESP(id, apiKey) {
      this.pendingStatusRequestCount++;
      return fetch('https://api.thingspeak.com/channels/'+id+'/fields/2/last.json?api_key='+apiKey);
  }
  
  @action setStatusLocal(ipAddress, value) {
        return fetch("http://"+ipAddress+"/"+value?"open":"close")
                    .then((response) => response.json())
                    .then((data) => {});
  }

  @action setStatusRemote(value, apiKey) {
      
        return fetch("https://api.thingspeak.com/update", {
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
        });
 
	}  
   
}
var statusStore = new StatusStore;

export default statusStore;