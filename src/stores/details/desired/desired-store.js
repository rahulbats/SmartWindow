import {observable, action, computed} from "mobx"
import detailsStore from "../details-store";

class DesiredStore {
    @observable desiredTemp = 20;
    @observable isLoading = false;
    @observable sliderTemp = 50;
    @observable minTemp = 10;
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

   @action setDesired(value) {
		return this.desiredTemp = Math.round(value);
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

  @action setDesired( apiKey) {
    this.pendingDesiredRequestCount++;
    var temporary = detailsStore.unit === 'C'?this.sliderTemp:Math.round((this.sliderTemp -32)/1.8)
        fetch("https://api.thingspeak.com/update", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key:apiKey,
                field3:temporary
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if(data===0){
                Alert.alert(
                    'Thingspeak returned error',
                    'You might be updating too quickly. Thingspeak allows 1 update per 15 seconds for free accounts.',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                );
            } else {
                this.desiredTemp = temporary ;
            }
            this.pendingDesiredRequestCount--;
        })
        .catch((error) => {
                console.error(error);
                Alert.alert(
                    'Thingspeak returned error',
                    'You might be updating too quickly. Thingspeak throttles free accounts.',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                );
            });
	}


   
}
var desiredStore = new DesiredStore;

export default desiredStore;