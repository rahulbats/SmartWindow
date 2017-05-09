import {observable, action, computed} from "mobx";
import detailsStore from "../details-store";
class IndoorStore {
    @observable indoorTemp = 20;
    @observable isLoading = false;
   
   @action setLoading(value) {
      this.isLoading = value;
    }


 @computed get getIndoorTemp() {
		return detailsStore.unit === 'C'?this.indoorTemp:Math.round((this.indoorTemp * 1.8)+32);
	}

  

  @action setIndoorTemp(value) {
		this.indoorTemp = value;
	}

  @action setUnit(value) {
        this.unit = value;
    }
 
}
var indoorStore = new IndoorStore;

export default indoorStore;