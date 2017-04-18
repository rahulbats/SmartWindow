import {observable, action, computed} from "mobx"

class DetailsStore {
    @observable desiredTemp = 50;
    @observable indoorTemp = 20;
    @observable outdoorTemp = 20;
    @observable smart = true;
    @observable open = false;

    @action setDesired(value) {
		return this.desiredTemp = Math.round(value) ;
	}
    @action setSmart(value) {
		return this.smart = value ;
	}
    @action setOpen(value) {
		return this.open =value ;
	}
}
var detailsStore = new DetailsStore;

export default detailsStore;
