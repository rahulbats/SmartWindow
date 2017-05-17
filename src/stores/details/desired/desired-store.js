import {observable, action, computed} from "mobx"
import detailsStore from "../details-store";

class DesiredStore {
    @observable desiredTemp = 20;
    @observable isLoading = false;
    @observable minTemp = -10;
    @observable maxTemp = 50;

   @action setLoading(value) {
      this.isLoading = value;
    }

  @computed get getDesiredTemp() {
		return detailsStore.unit === 'C'?this.desiredTemp:Math.round((this.desiredTemp * 1.8)+32);
	}

  @computed get getSliderTemp() {
		return detailsStore.unit === 'C'?this.sliderTemp:Math.round((this.sliderTemp * 1.8)+32);
	}

  @computed get getMinTemp() {
		return detailsStore.unit === 'C'?this.minTemp:Math.round((this.minTemp * 1.8)+32);
	}

  @computed get getMaxTemp() {
		return detailsStore.unit === 'C'?this.maxTemp:Math.round((this.maxTemp * 1.8)+32);
	}

   @action setDesired(value) {
		return this.desiredTemp = Math.round(value);
	} 



   
}
var desiredStore = new DesiredStore;

export default desiredStore;