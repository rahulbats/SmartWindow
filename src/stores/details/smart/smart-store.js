import {observable, action, computed} from "mobx"
import { Alert } from 'react-native';
class SmartStore {
    @observable smart = false;
    @observable isLoading = false;
   
   @action setLoading(value) {
      this.isLoading = value;
    }

    @action setSmart(value) {
        this.smart = value;
    }

  
   
}
var smartStore = new SmartStore;

export default smartStore;