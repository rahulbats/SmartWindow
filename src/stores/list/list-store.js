import {observable, action, computed} from "mobx";

class WindowsStore {
    @observable windows = [];
    @observable pendingRequestCount = 0;
    
    @computed get isLoading() {
		return this.pendingRequestCount > 0;
	}

    @action loadWindows(apiKey){
         this.pendingRequestCount++;
         this.windows = [];
         var temp =[];
         fetch('https://thingspeak.com/channels.json?api_key='+apiKey)
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
                    temp.push({name: channel.name, id:channel.id ,readApiKey: readKey, writeApiKey: writeKey});
                    
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

    @action addWindow(value) {
        this.windows.push(value);
    }
}
var windowsStore = new WindowsStore;

export default windowsStore;
