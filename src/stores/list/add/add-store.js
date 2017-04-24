import {observable, action, computed} from "mobx";

class AddStore {
    @observable name = '';
    @observable decription = '';
    @observable latitude = '';
    @observable longitude = '';
    
    @action setName(value) {
        this.name = value;
    }

    @action setDescription(value) {
        this.description = value;
    }

    @action setLatitude(value) {
        this.latitude = value;
    }

    @action setLongitude(value) {
        this.longitude = value;
    }
}

var addStore = new AddStore;

export default addStore;