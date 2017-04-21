import {observable, action, computed} from "mobx"

class OutdoorStore {
    @observable outdoorTemp = 20;
    @observable pendingOutdoorRequestCount = 0;
    
  
  @computed get isOutdoorLoading() {
		return this.pendingOutdoorRequestCount > 0;
	}

 

  @action loadOutdoor(id,apiKey) {
        this.pendingOutdoorRequestCount++;
         this.outdoorTemp = 20;
         fetch('https://api.thingspeak.com/channels/'+id+'/fields/1/last.json?api_key='+apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                this.outdoorTemp = Number(responseJson.field1);
                this.pendingOutdoorTempRequestCount--;
            })
            .catch((error) => {
                console.error(error);
            });
  }  
   
}
var outdoorStore = new OutdoorStore;

export default outdoorStore;