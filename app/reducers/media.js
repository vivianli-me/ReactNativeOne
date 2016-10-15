/**
 * Created by lipeiwei on 16/10/14.
 * ONE中音频的设计不是太好, 音频列表设计得不好
 */

import {ACTIONS} from '../actions/media';


//设计初始状态
const initState = {
  isMusicControlModalShow: false,
  isPlayingMedia: false,//当前是否正在播放音频
  mediaList: [
    {
      url: 'http://music.wufazhuce.com/lrueYR0Vv1_PFyB6nGMFbUn88AQm',
      type: 'music',
      musicName: '不知名',
      authorName: '不知名',
      id: 514
    },
    {
      url: 'http://m5.file.xiami.com/836/1836/4279/1771128943_3578911_l.mp3?auth_key=4987c5d91b4fcffc57df1b21d88cf830-1477105200-0-null',
      type: 'essay',
      musicName: '爱久见人心',
      authorName: '梁静茹',
      id: 518
    },
    {
      url: 'http://m5.file.xiami.com/836/1836/32630/389561_2592175_l.mp3?auth_key=18652ad62aec10d79147a1201a7bf254-1477105200-0-null',
      type: 'music',
      musicName: '给未来的自己',
      authorName: '梁静茹',
      id: 5144
    },
    {
      url: 'http://m5.file.xiami.com/318/2318/12416/152571_69179_l.mp3?auth_key=11b095887c2ce8eb0f33681ce9e6b92d-1477105200-0-null',
      type: 'essay',
      musicName: '最爱是v',
      authorName: '徐若瑄',
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
        isPlayingMedia: true
      });
    case ACTIONS.TO_NEXT_ONE:
      if (state.mediaList.length <= 1) {
        return state;
      }
      return Object.assign({}, state, {
        currentIndex: state.currentIndex >= state.mediaList.length - 1 ? 0 : state.currentIndex + 1,//不断循环
        isPlayingMedia: true
      });
    case ACTIONS.ADD_MEDIA:
      let mediaInfo = action.info;
      let mediaList = state.mediaList;
      mediaList.push(mediaInfo);//添加到尾部
      return Object.assign({}, state, {
        mediaList,
        currentIndex: mediaList.length -1,
        isPlayingMedia: true
      });
    case ACTIONS.CHANGE_MUSIC_CONTROL_MODAL_VISIBILITY:
      return Object.assign({} , state, {
        isMusicControlModalShow: action.visible
      });
    default:
      return state;
  }
}