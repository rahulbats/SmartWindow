import {observable, action, computed} from "mobx"

class WindowsStore {
    @observable windows = ["livingroom", "bedroom", "sdff","sdfsfdfsf", "sdxcvxvxcv", "vfeferer", "vreergegfer","vvdvzsdcssdc", "vrrthrthrh", "ertertertt", "rrahul", "vdvdvdf", "werwrw", "vfdfvdfvd", "werwer", "sdasczczx", "rterttet"];
    @observable pendingRequestCount = 0;
    @computed get isLoading() {
		return this.pendingRequestCount > 0;
	}

    @action loadWindows(apiKey){
         this.pendingRequestCount++;
         fetch('https://thingspeak.com/channels.json?api_key='+apiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                this.windows = responseJson;
                //return responseJson.movies;
                this.pendingRequestCount--;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    @action addWindow(value) {
        this.windows.push(value);
    }
}
var windowsStore = new WindowsStore;

export default windowsStore;
