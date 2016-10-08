/**
 * Created by lipeiwei on 16/10/5.
 */


import {get} from './apiHelper';

//顶部滚动的图片信息列表
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
//短篇   连载          问答
const articleType = ['essay', 'serialcontent', 'question'];
export function getSpecifiedTypeArticleList(year, month, index) {
  month = month + 1;//程序里月份表示范围是0~11, 所以要加一
  return get(`/${articleType[index]}/bymonth/${year}-${month}`);
}

const regExp = new RegExp('<[a-zA-Z0-9_/]+>|\r\n|\n', 'g');

const replaceHTMLTag = text => {
  if (text == '<br>') {
    return '\n';
  }
  return '';
};

//获取短篇详细信息
export function getEssayDetailInfo(id) {
  return get(`/essay/${id}`).then(detailData => {
    detailData.hp_content = detailData.hp_content.replace(regExp, replaceHTMLTag);
    return detailData;
  })
}

//获取连载详细信息
export function getSerialDetailInfo(id) {
  return get(`/serialcontent/${id}`).then(detailData => {
    detailData.content = detailData.content.replace(regExp, replaceHTMLTag);
    return detailData;
  });
}

//获取问答详细信息
export function getQuestionDetailInfo(id) {
  return get(`/question/${id}`).then(detailData => {
    detailData.answer_content = detailData.answer_content.replace(regExp, replaceHTMLTag);
    return detailData;
  });
}