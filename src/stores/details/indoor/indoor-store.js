import {observable, action, computed} from "mobx";
import detailsStore from "../details-store";
class IndoorStore {
    @observable indoorTemp = 20;
    @observable pendingIndoorRequestCount = 0;
    
  
  @computed get isIndoorLoading() {
		return this.pendingIndoorRequestCount > 0;
	}

 @computed get getIndoorTemp() {
		return detailsStore.unit === 'C'?this.indoorTemp:Math.round((this.indoorTemp * 1.8)+32);
	}

  @action setUnit(value) {
        this.unit = value;
    }


  @action loadIndoor(id,apiKey) {
        this.pendingIndoorRequestCount++;
         this.indoorTemp = 20;
         fetch('https://api.thingspeak.com/channels/'+id+'/fields/1/last.json?api_key='+apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                this.indoorTemp = Number(responseJson.field1);
                this.pendingIndoorRequestCount--;
            })
            .catch((error) => {
                console.error(error);
            });
  }  
   
}
var indoorStore = new IndoorStore;

export default indoorStore;