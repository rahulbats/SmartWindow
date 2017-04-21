import {observable, action, computed} from "mobx"

class StatusStore {
    @observable smart = true;
    @observable pendingSmartRequestCount = 0;
    
  
    @computed get isSmartLoading() {
     return this.pendingSmartRequestCount > 0;
	}

 

  @action loadSmart(id,apiKey) {
        this.pendingSmartRequestCount++;
         this.smart = false;
         fetch('https://api.thingspeak.com/channels/'+id+'/fields/5/last.json?api_key='+apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                this.smart = responseJson.field5==="0"?false:true;
                this.pendingSmartRequestCount--;
            })
            .catch((error) => {
                console.error(error);
            });
  }

  
  @action setSmart(value) {
		return this.smart = value ;
	}  
   
}
var smartStore = new SmartStore;

export default smartStore;