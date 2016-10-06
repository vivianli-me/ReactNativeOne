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

//获取短篇详细信息
export function getEssayDetailInfo(id) {
  return get(`/essay/${id}`).then(detailData => {
    detailData.hp_content = detailData.hp_content.replace(new RegExp('<br>', 'g'), '');//去除掉文本中的<br>
    return detailData;
  });
}

//获取连载详细信息
export function getSerialDetailInfo(id) {
  return get(`/serialcontent/${id}`);
}

//获取问答详细信息
export function getQuestionDetailInfo(id) {
  return get(`/question/${id}`);
}