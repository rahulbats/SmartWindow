import {observable} from "mobx"

class InitStore {
    @observable apiKey = "";
    setApiKey(value) {
        this.apiKey = value;
    }
}

var initStore = new InitStore;
export default initStore;
