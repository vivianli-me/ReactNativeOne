/**
 * Created by lipeiwei on 16/10/10.
 */

import {getFetchFromCache, getFetchNeverCached} from './apiHelper';
import {cacheByYearAndMonth} from './needCache';

const regExp = new RegExp('<[a-zA-Z0-9_/]+>|\r\n|\n', 'g');

const replaceHTMLTag = text => {
  if (text == '<br>') {
    return '\n';
  }
  return '';
};

export function getMusicDetail(id) {
  return getFetchFromCache(`/music/detail/${id}`).then(detailData => {
    detailData.story = detailData.story.replace(regExp, replaceHTMLTag);
    return detailData;
  });
}

//这个需要获得最新, 不能进行缓存
export function getMusicIdList() {
  return getFetchNeverCached(`/music/idlist/0`);
}

export function getMusicListByMonth(year, month) {
  let get = cacheByYearAndMonth(year, month) ? getFetchFromCache : getFetchNeverCached;
  month = month + 1;
  return get(`/music/bymonth/${year}-${month}`);
}