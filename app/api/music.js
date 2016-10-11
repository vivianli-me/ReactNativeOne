/**
 * Created by lipeiwei on 16/10/10.
 */

import {get} from './apiHelper';

const regExp = new RegExp('<[a-zA-Z0-9_/]+>|\r\n|\n', 'g');

const replaceHTMLTag = text => {
  if (text == '<br>') {
    return '\n';
  }
  return '';
};

export function getMusicDetail(id) {
  return get(`/music/detail/${id}`).then(detailData => {
    detailData.story = detailData.story.replace(regExp, replaceHTMLTag);
    return detailData;
  });
}

export function getMusicIdList() {
  return get(`/music/idlist/0`);
}

export function getMusicListByMonth(year, month) {
  month = month + 1;
  return get(`/music/bymonth/${year}-${month}`);
}