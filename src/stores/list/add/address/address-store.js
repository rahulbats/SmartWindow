import {observable, action, computed} from "mobx";

class AddressStore {
    @observable googleApiKey = 'AIzaSyDPG796HfnBlTJ5iQTEs7nJA1XlvFdnFmw';
    @observable query = '';
    @observable latitude = '';
    @observable longitude = '';
    @observable suggestions = [];
    
    @action setGoogleApiKey(value) {
        this.googleApiKey = value;
    }

    @action setSuggestion(value) {
        this.suggestions = value;
    }

    @action setQuery(value, loadSuggestions) {
        this.query = value;
        if(loadSuggestions)
            this.loadSuggestions(value);
        
    }
    
    @action loadSuggestions(value) {
        if(value.length>3) {
            fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+value+'&key='+this.googleApiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                    this.suggestions = responseJson.results;
            });
        }
    }

    

    @action setLatitude(value) {
        this.latitude = ''+value;
    }

    @action setLongitude(value) {
        this.longitude = ''+value;
    }


    
}

var addressStore = new AddressStore;

export default addressStore;