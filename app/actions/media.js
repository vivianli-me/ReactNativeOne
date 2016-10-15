/**
 * Created by lipeiwei on 16/10/14.
 */
import Toast from '../util/toast';
import {
  NativeModules,
  DeviceEventEmitter
} from 'react-native';

const {MediaPlayer} = NativeModules;



export const ACTIONS = {
  STOP_PLAY_MEDIA: 'STOP_PLAY_MEDIA',//停止播放
  START_PLAY_MEDIA: 'START_PLAY_MEDIA',//开始播放
  TO_PREVIOUS_ONE: 'TO_PREVIOUS_ONE',//上一首
  TO_NEXT_ONE: 'TO_NEXT_ONE',//下一首
  ADD_MEDIA: 'ADD_MEDIA',//添加音频,
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

export function startPlayMedia() {
  return (dispatch, getState) => {
    let media = getState().media;
    let mediaList = media.mediaList;
    if (mediaList.length === 0) {
      Toast.show('当前列表无歌曲');
      return;
    }
    //UI先变化
    dispatch({
      type: ACTIONS.START_PLAY_MEDIA
    });
    let url = mediaList[media.currentIndex].url;//音乐路径
    //开始缓冲
    MediaPlayer.start(url).then(() => {
      //加载完成
      console.info('startPlayMedia 缓冲完毕');
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
      Toast.show('当前列表仅有一首歌曲');
      return;
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
      console.info('turnToPreviousOne 缓冲完毕');
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
      Toast.show('当前列表仅有一首歌曲');
      return;
    }
    dispatch({
      type: ACTIONS.TO_NEXT_ONE
    });
    let media = getState().media;
    let currentIndex = media.currentIndex;
    let url = media.mediaList[currentIndex].url;//音乐路径
    MediaPlayer.start(url).then(() => {
      //缓冲完成, 开始播放
      console.info('turnToNextOne 缓冲完毕');
    }).catch(() => {
      console.warn('播放出错');
      dispatch({
        type: ACTIONS.STOP_PLAY_MEDIA
      });
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

export function changeMusicControlModalVisibility(visible) {
  return {
    type: ACTIONS.CHANGE_MUSIC_CONTROL_MODAL_VISIBILITY,
    visible
  };
}