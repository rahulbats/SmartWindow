import {observable, action, computed} from "mobx";
import addressStore from './address/address-store'
import tsinitStore from '../../tsinit/tsinit-store'
class AddStore {
    @observable name = '';
    @observable decription = '';
    
    @action setName(value) {
        this.name = value;
    }

    @action setDescription(value) {
        this.description = value;
    }

    @action addChannel() {
        fetch("https://api.thingspeak.com/channels", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key:tsinitStore.apiKey,
                name:this.name,
                description: this.decription,
                latitude: addressStore.latitude,
                longitude: addressStore.longitude,

            })
        })
        .then((response) => response.json())
        .then((data) => {
            if(data===0){
                Alert.alert(
                    'Thingspeak returned error',
                    'You might be updating too quickly. Thingspeak allows 1 update per 15 seconds for free accounts. Try again in few.',
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
                    'You might be updating too quickly. Thingspeak allows 1 update per 15 seconds for free accounts. Try again in few.',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                );
            });
 
    }

    @action updateChannel(id) {
        fetch("https://api.thingspeak.com/channels/"+id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key:tsinitStore.apiKey,
                name:this.name,
                description: this.decription,
                latitude: addressStore.latitude,
                longitude: addressStore.longitude,

            })
        })
        .then((response) => response.json())
        .then((data) => {
            if(data===0){
                Alert.alert(
                    'Thingspeak returned error',
                    'You might be updating too quickly. Thingspeak allows 1 update per 15 seconds for free accounts. Try again in few.',
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