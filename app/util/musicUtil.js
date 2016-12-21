/**
 * Created by lipeiwei on 16/10/15.
 * 根据虾米音乐id获取歌曲播放地址
 * 中间做了缓存, 避免多次请求
 */

import {
  AsyncStorage
} from 'react-native';

const PREFIX = 'XIAMI_MUSIC_URL_';

//TODO 得想办法防止将来这个解析接口失效了
//see https://github.com/naoyeye/xiamiRun
const absoluteUrl = id => `http://xiamirun.avosapps.com/run?song=http://www.xiami.com/song/${id}`;


export function getXiamiMusicUrl(musicId) {
  return AsyncStorage.getItem(`${PREFIX}${musicId}`).then(url => {
    if (url) {
      console.info('get xiami music url from storage');
      return url;
    } else {
      return getXiamiMusicUrlFromNetwork(musicId);
    }
  });
}

function getXiamiMusicUrlFromNetwork(musicId) {
  let promise;
  promise = fetch(absoluteUrl(musicId), {
    method: 'GET',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    }
  }).then(text => text.json()).then(response => {
    console.info('get xiami music url from network');
    if (response.url) {
      AsyncStorage.setItem(`${PREFIX}${musicId}`, response.url);//存储到map
      return response.url;
    } else {
      let errInfo = `请求虾米音乐时出错 url = ${absoluteUrl(musicId)}  response = ${JSON.stringify(response)}`;
      console.warn(errInfo);
      throw new Error(errInfo);
    }
  });
  return promise;
}