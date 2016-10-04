/**
 * Created by lipeiwei on 16/10/4.
 */
import {
  Platform,
  BackAndroid
} from 'react-native';
import MainContainer from './container/mainContainer';
import BeforeMonthList from './component/beforeMonthList';
import BeforePictureList from './component/beforePictureList';
import PicturePage from './component/picturePage';
import ImageViewer from './component/imageViewer';

let navigator;

const routeMap = new Map();

routeMap.set('MainContainer', MainContainer);
routeMap.set('BeforeMonthList', BeforeMonthList);
routeMap.set('BeforePictureList', BeforePictureList);
routeMap.set('PicturePage', PicturePage);
routeMap.set('ImageViewer', ImageViewer);

//后退键处理
if (Platform.OS === 'android') {
  BackAndroid.addEventListener('hardwareBackPress', () => {
    const routers = navigator.getCurrentRoutes();
    if (routers.length > 1) {
      navigator.pop();
      return true;
    }
    return false;
  });
}

export function registerNavigator(tempNavigator) {
  if (navigator) {
    return;
  }
  navigator = tempNavigator;

}

export function getNavigator() {
  return navigator;
}

export function getRouteMap() {
  return routeMap;
}






