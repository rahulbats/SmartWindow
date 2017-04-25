import {observable, action, computed} from "mobx";

class AddStore {
    @observable name = '';
    @observable decription = '';
    
    @action setName(value) {
        this.name = value;
    }

    @action setDescription(value) {
        this.description = value;
    }

    
}

var addStore = new AddStore;

export default addStore;