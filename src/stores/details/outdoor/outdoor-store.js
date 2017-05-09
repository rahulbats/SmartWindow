import {observable, action, computed} from "mobx"
import detailsStore from "../details-store";

class OutdoorStore {
    @observable outdoorTemp = 20;
    @observable isLoading = false;

    @action setLoading(value) {
      this.isLoading = value;
    }


    @computed get getOutdoorTemp() {
		return detailsStore.unit === 'C'?this.outdoorTemp:Math.round((this.outdoorTemp * 1.8)+32);
	}

    @action setUnit(value) {
        this.unit = value;
    }

    @action setOutdoorTemp(value) {
		this.outdoorTemp = value;
	}
   
}
var outdoorStore = new OutdoorStore;

export default outdoorStore;