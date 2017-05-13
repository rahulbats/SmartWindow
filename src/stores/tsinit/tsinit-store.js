import {observable, action} from "mobx"

class InitStore {
    @observable aioKey = "";
    @observable username = "";
    @observable animOpacity = 0;
    @action
    setAioKey(value) {
        this.aioKey = value;
    }
    @action
    setUsername(value) {
        this.username = value;
    }
}

var initStore = new InitStore;
export default initStore;
