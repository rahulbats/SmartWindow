import {observable, action, computed} from "mobx"

class DetailsStore {
    @observable unit = 'C';
    
    @action setUnit(value) {
		return this.unit = value ;
	}  
   
}
var detailsStore = new DetailsStore;

export default detailsStore;