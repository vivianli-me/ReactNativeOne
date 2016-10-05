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
export function getLatestArticleList() {
  return get('/reading/index');
}

//essay serialcontent question
const articleType = ['essay', 'serialcontent', 'question'];
export function getSpecifiedTypeArticleList(year, month, index) {
  month = month + 1;//程序里月份表示范围是0~11, 所以要加一
  return get(`/${articleType[index]}/bymonth/${year}-${month}`);
}