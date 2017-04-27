import {observable, action, computed} from "mobx";
import initStore from '../tsinit/tsinit-store';

class WindowsStore {
    @observable windows = [];
    @observable pendingRequestCount = 0;
    
    @computed get isLoading() {
		return this.pendingRequestCount > 0;
	}

    @action loadWindows(){
         this.pendingRequestCount++;
         this.windows = [];
         var temp =[];
         fetch('https://thingspeak.com/channels.json?api_key='+initStore.apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.forEach(channel=>{
                    var apiKeys = channel.api_keys;
                    var readKey='';
                    var writeKey='';
                    apiKeys.forEach(apiKey => {
                        if(apiKey.write_flag===false) {
                            readKey = apiKey.api_key;
                        } else {
                            writeKey = apiKey.api_key;
                        }
                    });
                    temp.push({name: channel.name, id:channel.id, description: channel.description, 
                         latitude: channel.latitude,
                         longitude: channel.longitude,
                         readApiKey: readKey, writeApiKey: writeKey});
                    
                });
                this.windows.replace(temp);
                //this.windows = responseJson;
                //return responseJson.movies;
                this.pendingRequestCount--;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    @action deleteWindow(id){
         this.pendingRequestCount++;
         fetch("https://api.thingspeak.com/channels/"+id+".json", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key:initStore.apiKey
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.pendingRequestCount--;
            this.loadWindows();
        })
        .catch((error) => {
                this.data=0;
                Alert.alert(
                    'Thingspeak returned error',
                    'You might be updating too quickly. Thingspeak allows 1 update per 15 seconds for free accounts. Try again in few.',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                );
            });
    }

    @action addWindow(value) {
        this.windows.push(value);
    }
}
var windowsStore = new WindowsStore;

export default windowsStore;
