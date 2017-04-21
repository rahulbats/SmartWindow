import {observable, action, computed} from "mobx"

class DesiredStore {
    @observable desiredTemp = 20;
    @observable pendingDesiredRequestCount = 0;
    @observable sliderTemp = 50;
  
   @computed get isDesiredLoading() {
		return this.pendingDesiredRequestCount > 0;
	}


 

  @action loadDesired(id,apiKey,setSlider) {
        this.pendingDesiredRequestCount++;
         this.desiredTemp = 20;
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
    this.sliderTemp = this.desiredTemp;
	}

  @computed get isDesiredDifferentFromSlider() {
		return this.sliderTemp !== this.desiredTemp;
	}

   
}
var desiredStore = new DesiredStore;

export default desiredStore;