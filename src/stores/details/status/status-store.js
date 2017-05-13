import {observable, action, computed} from "mobx"
import { Alert } from 'react-native';
class StatusStore {
    @observable open = true;
    @observable isLoading = false;
    @observable displayError = false;
  
    @action setLoading(value) {
      this.isLoading = value;
    }

    @action setOpen(value) {
        this.open = value;
    }

  @action setDisplayError(value) {
      displayError = value;
  }

}
var statusStore = new StatusStore;

export default statusStore;