import {observable, action, computed} from "mobx"

class DetailsStore {
    @observable unit = 'C';
    @observable group;

    @action setUnit(value) {
		  return this.unit = value ;
	  }  

    @action setGroup(value) {
		  return this.group = value ;
	  }  
   
}
var detailsStore = new DetailsStore;

export default detailsStore;