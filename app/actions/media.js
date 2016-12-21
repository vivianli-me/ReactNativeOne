/**
 * Created by lipeiwei on 16/10/14.
 */
import Toast from '../util/toast';
import {
  NativeModules,
  DeviceEventEmitter,
  Platform
} from 'react-native';
import {getXiamiMusicUrl} from '../util/musicUtil';

var MediaPlayer;

if (Platform.OS === 'ios') {
  MediaPlayer = {
    start() {
      return new Promise((resolve, reject) => {
        reject();
        console.warn('暂时还没写好iOS端播放音频的原生代码');
      });
    },
    stop() {}
  };
} else {
  MediaPlayer = NativeModules.MediaPlayer;
}


export const ACTIONS = {
  STOP_PLAY_MEDIA: 'STOP_PLAY_MEDIA',//停止播放
  START_PLAY_MEDIA: 'START_PLAY_MEDIA',//开始播放
  LOADING_MEDIA_SUCCESS: 'LOADING_MEDIA_SUCCESS',//缓冲成功
  TO_PREVIOUS_ONE: 'TO_PREVIOUS_ONE',//上一首
  TO_NEXT_ONE: 'TO_NEXT_ONE',//下一首
  CHANGE_MUSIC_CONTROL_MODAL_VISIBILITY: 'CHANGE_MUSIC_CONTROL_MODAL_VISIBILITY'
};

export function stopPlayMedia() {
  return dispatch => {
    MediaPlayer.stop().then(() => {
      dispatch({
        type: ACTIONS.STOP_PLAY_MEDIA
      });
    });
  }
}

export function startPlayMedia(info) {
  return (dispatch, getState) => {
    let media = getState().media;
    let mediaList = media.mediaList;
    //当前列表为空且不添加歌曲
    if (mediaList.length === 0 && !info) {
      Toast.show('当前列表无歌曲');
      return;
    }
    //UI先变化
    dispatch({
      type: ACTIONS.START_PLAY_MEDIA,
      info//添加media
    });
    //dispatch之后得重新getState
    media = getState().media;
    mediaList = media.mediaList;
    let url = mediaList[media.currentIndex].url;//音乐路径
    //开始缓冲
    MediaPlayer.start(url).then(() => {
      //加载完成
      dispatch({
        type: ACTIONS.LOADING_MEDIA_SUCCESS
      });
    }).catch(() => {
      console.warn('播放出错');
      dispatch({
        type: ACTIONS.STOP_PLAY_MEDIA
      });
    });
  }
}

export function turnToPreviousOne() {
  return (dispatch, getState) => {
    let length = getState().media.mediaList.length;
    if (length === 0) {
      Toast.show('当前列表无歌曲');
      return;
    }
    if (length === 1) {
      // Toast.show('当前列表仅有一首歌曲');
    }
    dispatch({
      type: ACTIONS.TO_PREVIOUS_ONE
    });
    //此时一定要重新getState
    let media = getState().media;
    let currentIndex = media.currentIndex;
    let url = media.mediaList[currentIndex].url;//音乐路径
    MediaPlayer.start(url).then(() => {
      //缓冲完成, 开始播放
      dispatch({
        type: ACTIONS.LOADING_MEDIA_SUCCESS
      });
    }).catch(() => {
      console.warn('播放出错');
      dispatch({
        type: ACTIONS.STOP_PLAY_MEDIA
      });
    });
  };
}

export function turnToNextOne() {
  return (dispatch, getState) => {
    let mediaList = getState().media.mediaList;
    let length = mediaList.length;
    if (length === 0) {
      Toast.show('当前列表无歌曲');
      return;
    }
    if (length === 1) {
      // Toast.show('当前列表仅有一首歌曲');
    }
    dispatch({
      type: ACTIONS.TO_NEXT_ONE
    });
    let media = getState().media;
    let currentIndex = media.currentIndex;
    let url = media.mediaList[currentIndex].url;//音乐路径
    MediaPlayer.start(url).then(() => {
      //缓冲完成, 开始播放
      dispatch({
        type: ACTIONS.LOADING_MEDIA_SUCCESS
      });
    }).catch(() => {
      console.warn('播放出错');
      dispatch({
        type: ACTIONS.STOP_PLAY_MEDIA
      });
    });
  };
}

export function changeMusicControlModalVisibility(visible) {
  return {
    type: ACTIONS.CHANGE_MUSIC_CONTROL_MODAL_VISIBILITY,
    visible
  };
}

export function getXiamiMusicUrlAndPlay(info, musicId) {
  return (dispatch, getState) => {
    //UI先变化
    dispatch({
      type: ACTIONS.START_PLAY_MEDIA
    });
    getXiamiMusicUrl(musicId).then(url => {
      startPlayMedia(Object.assign({}, info, {url}))(dispatch, getState);
    }).catch(() => {
      let errInfo = `请求虾米音乐时出错 musicId = ${musicId}`;
      console.warn(errInfo);
      dispatch({
        type: ACTIONS.STOP_PLAY_MEDIA
      });
    });
  };
}