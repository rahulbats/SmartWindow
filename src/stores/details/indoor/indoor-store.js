import {observable, action, computed} from "mobx"

class IndoorStore {
    @observable indoorTemp = 20;
    @observable pendingIndoorRequestCount = 0;
    
  
  @computed get isIndoorLoading() {
		return this.pendingIndoorRequestCount > 0;
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