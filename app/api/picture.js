/**
 * Created by lipeiwei on 16/10/3.
 */

import {get} from './apiHelper';


/**
 * 拉取首页中的图片列表, 参数为string类型, 如2016-09
 * @return Array
 * @param year
 * @param month 0 ~ 11
 */
export function getPictureList(year, month) {
  month = month + 1;
  return get(`/hp/bymonth/${year}-${month}`);
}
