/**
 * Created by lipeiwei on 16/10/5.
 */


import {get} from './apiHelper';

//顶部滚动的图片
export function getReadingImageList() {
  return get('/reading/carousel');
}

//顶部滚动图片点击进去的内容
export function getReadingImageDetail(id) {
  return get(`/reading/carousel/${id}`);
}

//底部的短篇连载问答列表
export function getReadingIndexList() {
  return get('/reading/index');
}