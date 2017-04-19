import {observable, action, computed} from "mobx"

class DetailsStore {
    @observable desiredTemp = 50;
    @observable indoorTemp = 20;
    @observable outdoorTemp = 20;
    @observable smart = true;
    @observable open = false;
    @observable pendingDesiredRequestCount = 0;
    @observable pendingIndoorRequestCount = 0;
    @observable pendingOutdoorRequestCount = 0;
    @observable pendingDesiredRequestCount = 0;
    @observable pendingSmartRequestCount = 0;
    @observable pendingOpenRequestCount = 0;
    @observable sliderTemp = 50;

  @computed get isDesiredLoading() {
		return this.pendingDesiredRequestCount > 0;
	}

  @computed get isIndoorLoading() {
		return this.pendingIndoorRequestCount > 0;
	}

  @computed get isOutdoorLoading() {
		return this.pendingOutdoorRequestCount > 0;
	}

  @computed get isSmartLoading() {
    return this.pendingSmartRequestCount > 0;
	}

  @computed get isOpenLoading() {
    return this.pendingOpenRequestCount > 0;
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
  @action loadDesired(id,apiKey) {
        this.pendingDesiredRequestCount++;
         this.desiredTemp = 20;
         fetch('https://api.thingspeak.com/channels/'+id+'/fields/3/last.json?api_key='+apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                this.desiredTemp = Number(responseJson.field3);
                this.pendingDesiredRequestCount--;
            })
            .catch((error) => {
                console.error(error);
            });
  }  
  @action loadOpened(id,apiKey) {
        this.pendingOpenRequestCount++;
         this.open = 20;
         fetch('https://api.thingspeak.com/channels/'+id+'/fields/2/last.json?api_key='+apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                this.open = responseJson.field2==="0"?false:true;
                this.pendingOpenRequestCount--;
            })
            .catch((error) => {
                console.error(error);
            });
  }  
  
  
  @action setSlider(value) {
		return this.sliderTemp = Math.round(value);
	}

  @action setDesired(id, apiKey, value) {
    this.pendingDesiredRequestCount++;
    fetch("https://api.thingspeak.com/update", {
      method: 'POST',
      body: {api_key:apiKey, field3:value}
    })
    .then((data) => {
              if(data!=="0") {
                this.desiredTemp = Number(data);
              } else {
                 this.sliderTemp = this.desiredTemp; 
              }
            })
            .catch((error) => {
                console.error(error);
            });
	}


  @action resetSlider() {
    this.sliderTemp = this.desiredTemp;
	}

  @computed get isDesiredDifferentFromSlider() {
		return this.sliderTemp !== this.desiredTemp;
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
