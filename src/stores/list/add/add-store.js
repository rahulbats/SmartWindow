import {observable, action, computed} from "mobx";
import addressStore from './address/address-store'
import tsinitStore from '../../tsinit/tsinit-store'
import windowsStore from '../list-store'

class AddStore {
    @observable id = null;
    @observable name = '';
    @observable description = '';
    @observable pendingRequestCount = 0;
    @observable data=null;
  
    @computed get isLoading() {
		return this.pendingRequestCount > 0;
	}

    @action setId(value) {
        this.id = value;
    }

    @action setName(value) {
        this.name = value;
    }

    @action setDescription(value) {
        this.description = value;
    }

    @action addChannel() {
        this.pendingIndoorRequestCount++;
        fetch("https://api.thingspeak.com/channels", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key:tsinitStore.apiKey,
                name:this.name,
                description: this.description,
                latitude: addressStore.latitude,
                longitude: addressStore.longitude,
                field1: 'indoor-temp',
                field2: 'window-status',
                field3: 'desired-temp',
                field4: 'outdoor-temp',
                field5: 'smarts'

            })
        })
        .then((response) => response.json())
        .then((data) => {
            this.data = data;
            if(data===0){
                Alert.alert(
                    'Thingspeak returned error',
                    'You might be updating too quickly. Thingspeak allows 1 update per 15 seconds for free accounts. Try again in few.',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                );
            } 
            this.pendingStatusRequestCount--;
            windowsStore.loadWindows();
        })
        .catch((error) => {
                this.data = 0;
                Alert.alert(
                    'Thingspeak returned error',
                    'You might be updating too quickly. Thingspeak allows 1 update per 15 seconds for free accounts. Try again in few.',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                );
            });
 
    }

    @action updateChannel() {
        this.pendingIndoorRequestCount++;
        fetch("https://api.thingspeak.com/channels/"+this.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key:tsinitStore.apiKey,
                name:this.name,
                description: this.description,
                latitude: addressStore.latitude,
                longitude: addressStore.longitude,

            })
        })
        .then((response) => response.json())
        .then((data) => {
            this.pendingStatusRequestCount--;
            this.data=data;
            if(data===0){
                Alert.alert(
                    'Thingspeak returned error',
                    'You might be updating too quickly. Thingspeak allows 1 update per 15 seconds for free accounts. Try again in few.',
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed!')},
                        ]
                    );
            } 
            windowsStore.loadWindows();
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

    
}

var addStore = new AddStore;

export default addStore;