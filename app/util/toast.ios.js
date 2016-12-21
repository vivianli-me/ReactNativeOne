/**
 * Created by lipeiwei on 16/10/2.
 */
import toast from '@remobile/react-native-toast';

function show(message) {
  toast.showShortBottom(message);
}

function showLong(message) {
  toast.showLongBottom(message);
}

export default {
  show,
  showLong
}


