/**
 * Created by lipeiwei on 16/10/27.
 */
import {
  AsyncStorage
} from 'react-native';
import storage from 'react-native-simple-store';

/**
 * @param key
 * @param fetchFunc
 * @param cached 是否从缓存中取
 */
export default apiCache = (key, fetchFunc, cached = true) => {
  if (!cached) {
    //不缓存
    console.log(`cached = false. get api data from network ————  key = ${key}`);
    return fetchFunc();
  }
  return storage.get(key).then(value => {
    if (value) {
      console.log(`get api data from storage ————  key = ${key}`);
      return value;
    } else {
      return fetchFunc().then(value => {
        console.log(`get api data from network ————  key = ${key}`);
        storage.save(key, value);//存储
        return value;
      });
    }
  });
};