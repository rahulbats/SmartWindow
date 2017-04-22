import {observable, action, computed} from "mobx"

class StatusStore {
    @observable open = true;
    @observable pendingStatusRequestCount = 0;
    
  
    @computed get isStatusLoading() {
     return this.pendingStatusRequestCount > 0;
	}

 

  @action loadStatus(id,apiKey) {
        this.pendingStatusRequestCount++;
         this.open = true;
         fetch('https://api.thingspeak.com/channels/'+id+'/fields/2/last.json?api_key='+apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                this.open = responseJson.field2==="0"?false:true;
                this.pendingStatusRequestCount--;
            })
            .catch((error) => {
                console.error(error);
            });
  }

  
  @action setStatus(value) {
		return this.open = value ;
	}  
   
}
var statusStore = new StatusStore;

export default statusStore;