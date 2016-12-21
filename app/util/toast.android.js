/**
 * Created by lipeiwei on 16/10/2.
 */


import {
  ToastAndroid
} from 'react-native'

function show(message) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}

function showLong(message) {
  ToastAndroid.show(message, ToastAndroid.LONG);
}

export default {
  show,
  showLong
}