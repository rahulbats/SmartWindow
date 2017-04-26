import {observable, action, computed} from "mobx";
import apiKeys from "../../../../apikeys/apikeys"
class AddressStore {
    //@observable googleApiKey = 'AIzaSyDPG796HfnBlTJ5iQTEs7nJA1XlvFdnFmw';
    @observable query = '';
    @observable latitude = '';
    @observable longitude = '';
    
    @observable currentPosition = {formatted_address:'Current Location', geometry:{location:{lng:-97,lat:33}}};
    @observable suggestions = [this.currentPosition];

    /*@action setGoogleApiKey(value) {
        this.googleApiKey = value;
    }*/

    @action setQuery(value, loadSuggestions) {
        this.query = value;
        if(loadSuggestions && this.query.length>3)
            this.loadSuggestions(value);
        else
            this.initSuggestion();
    }
    
    @action loadSuggestions() {
        
            fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+this.query+'&key='+apiKeys.googleApiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                    this.suggestions = responseJson.results;
            });
        
    }

    @action initSuggestion() {
        this.suggestions = [];
        this.suggestions.push(this.currentPosition);
    }
    @action setCurrentPosition(value) {
        this.currentPosition = value;
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