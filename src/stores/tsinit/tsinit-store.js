import {observable} from "mobx"

class InitStore {
    @observable apiKey = "";
    @observable animOpacity = 0;
    setApiKey(value) {
        this.apiKey = value;
    }
}

var initStore = new InitStore;
export default initStore;
