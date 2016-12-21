/**
 * Created by lipeiwei on 16/10/3.
 */

import {getFetchNeverCached, getFetchFromCache} from './apiHelper';
import {cacheByYearAndMonth} from './needCache';

/**
 * 拉取首页中的图片列表, 参数为string类型, 如2016-09
 * @return Array
 * @param year
 * @param month 0 ~ 11
 */
export function getPictureList(year, month) {
  let get = cacheByYearAndMonth(year, month) ? getFetchFromCache : getFetchNeverCached;
  month = month + 1;
  return get(`/hp/bymonth/${year}-${month}`);
}

export function getLatestPictureIdList() {
  return getFetchNeverCached('/hp/idlist/0');
}

export function getPictureDetail(id) {
  return getFetchFromCache(`/hp/detail/${id}`);
}
