/**
 * Created by lipeiwei on 16/10/27.
 */

//由年月份决定是否从缓存取
export function cacheByYearAndMonth(year, month) {
  let date = new Date();
  //当前月份的数据可能还会增加, 所以不能从缓存中取
  if (date.getFullYear() === year && date.getMonth() === month) {
    return false;
  } else {
    return true;
  }
}