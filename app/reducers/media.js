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
      url: 'http://music.wufazhuce.com/music/514',
      type: 'music',
      id: 514
    },
    {
      url: 'http://music.wufazhuce.com/essay/518',
      type: 'essay',
      id: 518
    },
    {
      url: 'http://music.wufazhuce.com/music/5144',
      type: 'music',
      id: 5144
    },
    {
      url: 'http://music.wufazhuce.com/essay/5254',
      type: 'essay',
      id: 5254
    }
  ],//
  currentIndex: 0
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