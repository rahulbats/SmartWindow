import {observable, action, computed} from "mobx"
import detailsStore from "../details-store";

class OutdoorStore {
    @observable outdoorTemp = 20;
    @observable pendingOutdoorRequestCount = 0;
 
  
  @computed get isOutdoorLoading() {
		return this.pendingOutdoorRequestCount > 0;
	}

    @computed get getOutdoorTemp() {
		return detailsStore.unit === 'C'?this.outdoorTemp:Math.round((this.outdoorTemp * 1.8)+32);
	}

    @action setUnit(value) {
        this.unit = value;
    }

  @action loadOutdoor(id,apiKey) {
        this.pendingOutdoorRequestCount++;
         this.outdoorTemp = 20;
         fetch('https://api.thingspeak.com/channels/'+id+'/fields/4/last.json?api_key='+apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                this.outdoorTemp = Number(responseJson.field4);
                this.pendingOutdoorRequestCount--;
            })
            .catch((error) => {
                console.error(error);
            });
  }  
   
}
var outdoorStore = new OutdoorStore;

export default outdoorStore;