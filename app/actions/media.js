/**
 * Created by lipeiwei on 16/10/14.
 */
import Toast from '../util/toast';
import {
  NativeModules,
  DeviceEventEmitter
} from 'react-native';

const {MediaPlayer} = NativeModules;

DeviceEventEmitter.addListener('ON_MEDIA_COMPLETION', () => {
  console.warn('播放完成');
});


export const ACTIONS = {
  STOP_PLAY_MEDIA: 'STOP_PLAY_MEDIA',//停止播放
  START_PLAY_MEDIA: 'START_PLAY_MEDIA',//开始播放
  TO_PREVIOUS_ONE: 'TO_PREVIOUS_ONE',//上一首
  TO_NEXT_ONE: 'TO_NEXT_ONE',//下一首
  ADD_MEDIA: 'ADD_MEDIA',//添加音频
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

export function startPlayMedia() {
  return (dispatch, getState) => {
    let state = getState();
    let mediaList = state.mediaList;
    if (mediaList.length === 0) {
      Toast.show('当前列表无歌曲');
      return;
    }
    let url = mediaList[state.currentIndex].url;//音乐路径
    MediaPlayer.start(url).then(() => {
      dispatch({
        type: ACTIONS.START_PLAY_MEDIA
      });
    }).catch(() => {
      console.warn('播放出错');
    });
  }
}

export function turnToPreviousOne() {
  return (dispatch, getState) => {
    let length = getState().mediaList.length;
    if (length === 0) {
      Toast.show('当前列表无歌曲');
      return;
    }
    if (length === 1) {
      Toast.show('当前列表仅有一首歌曲');
      return;
    }
    dispatch({
      type: ACTIONS.TO_PREVIOUS_ONE
    });
    //此时一定要重新getState
    let currentIndex = getState().currentIndex;
    let url = getState().mediaList[currentIndex].url;//音乐路径
    MediaPlayer.start(url).then(() => {
      //缓冲完成, 开始播放
      dispatch({
        type: ACTIONS.START_PLAY_MEDIA
      });
    }).catch(() => {
      console.warn('播放出错');
    });
  };
}

export function turnToNextOne() {
  return (dispatch, getState) => {
    let mediaList = getState().mediaList;
    let length = mediaList.length;
    if (length === 0) {
      Toast.show('当前列表无歌曲');
      return;
    }
    if (length === 1) {
      Toast.show('当前列表仅有一首歌曲');
      return;
    }
    dispatch({
      type: ACTIONS.TO_NEXT_ONE
    });
    let currentIndex = getState().currentIndex;
    let url = getState().mediaList[currentIndex].url;//音乐路径
    MediaPlayer.start(url).then(() => {
      //缓冲完成, 开始播放
      dispatch({
        type: ACTIONS.START_PLAY_MEDIA
      });
    }).catch(() => {
      console.warn('播放出错');
    });
  };
}

//mediaType (essay/music)
export function addMedia(info) {
  return (dispatch, getState) => {
    dispatch({
      type: ACTIONS.ADD_MEDIA,
      info,
    });
    startPlayMedia()(dispatch, getState);
  };
}