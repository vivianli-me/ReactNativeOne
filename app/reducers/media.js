/**
 * Created by lipeiwei on 16/10/14.
 * ONE中音频的设计不是太好, 音频列表设计得不好
 */

import {ACTIONS} from '../actions/media';


//设计初始状态
const initState = {
  isPlayingMedia: false,//当前是否正在播放音频
  mediaList: [
    {
      url: 'http://music.wufazhuce.com/lrueYR0Vv1_PFyB6nGMFbUn88AQm',
      type: 'music',
      id: 514
    },
    {
      url: 'http://m5.file.xiami.com/0/0/15748/193389_137421_l.mp3?auth_key=c24c9ae2c2cf5f0adcfaa2325228ba33-1477018800-0-null',
      type: 'essay',
      id: 518
    },
    {
      url: 'http://music.wufazhuce.com/ljObqE_KZ_wR1a43LPAKAiRj9Xvz',
      type: 'music',
      id: 5144
    },
    {
      url: 'http://m5.file.xiami.com/347/106347/2100366528/1776259003_60409059_l.mp3?auth_key=48794401015d5e43fc742ff5e1d7b9ed-1477018800-0-null',
      type: 'essay',
      id: 5254
    }
  ],//
  currentIndex: 1
};

export default function mediaReducer(state = initState, action) {
  switch (action.type) {
    case ACTIONS.STOP_PLAY_MEDIA:
      return state.isPlayingMedia === false ? state : Object.assign({}, state, {isPlayingMedia: false});
    case ACTIONS.START_PLAY_MEDIA:
      return state.isPlayingMedia === true ? state : Object.assign({}, state, {isPlayingMedia: true});
    case ACTIONS.TO_PREVIOUS_ONE:
      if (state.mediaList.length <= 1) {
        return state;
      }
      return Object.assign({}, state, {
        currentIndex: state.currentIndex <= 0 ? state.mediaList.length - 1 : state.currentIndex - 1,//不断循环
        isPlayingMedia: false
      });
    case ACTIONS.TO_NEXT_ONE:
      if (state.mediaList.length <= 0) {
        return state;
      }
      return Object.assign({}, state, {
        currentIndex: state.currentIndex >= state.mediaList.length - 1 ? 0 : state.currentIndex + 1,//不断循环
        isPlayingMedia: false
      });
    case ACTIONS.ADD_MEDIA:
      let mediaInfo = action.info;
      let mediaList = state.mediaList;
      mediaList.push(mediaInfo);//添加到尾部
      return Object.assign({}, state, {
        mediaList,
        currentIndex: mediaList.length -1,
        isPlayingMedia: false
      });
    default:
      return state;
  }
}