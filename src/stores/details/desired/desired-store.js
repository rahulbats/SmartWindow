import {observable, action, computed} from "mobx"
import detailsStore from "../details-store";

class DesiredStore {
    @observable desiredTemp = 20;
    @observable pendingDesiredRequestCount = 0;
    @observable sliderTemp = 50;
    @observable minTemp = 10;
    @observable maxTemp = 50;

   @computed get isDesiredLoading() {
		return this.pendingDesiredRequestCount > 0;
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



 

  @action loadDesired(id,apiKey,setSlider) {
        this.pendingDesiredRequestCount++;
         //this.desiredTemp = 20;
         fetch('https://api.thingspeak.com/channels/'+id+'/fields/3/last.json?api_key='+apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                this.desiredTemp = Number(responseJson.field3);
                if(setSlider) {
                  this.sliderTemp = Number(responseJson.field3);
                }
                this.pendingDesiredRequestCount--;
            })
            .catch((error) => {
                console.error(error);
            });
  }  


   @action setSlider(value) {
		return this.sliderTemp = Math.round(value);
	}




  @action resetSlider() {
    this.sliderTemp = this.getDesiredTemp;
	}

  @computed get isDesiredDifferentFromSlider() {
		return this.sliderTemp !== this.getDesiredTemp;
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


   
}
var desiredStore = new DesiredStore;

export default desiredStore;