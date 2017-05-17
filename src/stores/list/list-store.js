import {observable, action, computed} from "mobx";
import initStore from '../tsinit/tsinit-store';

class WindowsStore {
    @observable windows = [];
    @observable pendingRequestCount = 0;
    client;
    
    @computed get isLoading() {
		return this.pendingRequestCount > 0;
	}

    @action loadWindows(){
         this.pendingRequestCount++;
         this.windows = [];
         var temp =[];
         fetch('https://io.adafruit.com/api/v2/'+initStore.username+'/feeds', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-AIO-Key': initStore.aioKey
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.forEach(group=>{
                    temp.push({name: group.name, id:group.id, description: group.description, 
                         key: group.key});
                    
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

    @action deleteWindow(key){
         this.pendingRequestCount++;
         fetch('https://io.adafruit.com/api/v2/'+initStore.username+'/feeds/'+key, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-AIO-Key': initStore.aioKey
            }
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
