/**
 * Created by lipeiwei on 16/10/3.
 */



export function parseDate(dateStr) {
  var array = dateStr.split(' ');//这种解析方式还是有点危险, 将来one接口数据一遍不就完了
  var arrayOne = array[0].split('-');
  var arrayTwo = array[1].split(':');//月份表示范围是0 ~ 11, 所以传进去的参数得减去1
  var date = new Date(arrayOne[0], arrayOne[1] - 1, arrayOne[2], arrayTwo[0], arrayTwo[1], arrayTwo[2]);
  return date;
}


/**
 * 这个函数写得不好, 待改进
 * 返回一个二维数组
 * @param beginYear
 * @param beginMonth 范围为0 ~ 11
 */
export function getDateStrListBeforeNow(beginYear, beginMonth) {
  let dateList = [];
  let date = new Date();
  let currentMonth = date.getMonth();//当前月份
  let currentYear = date.getFullYear();//当前年份
  for (let year = currentYear, month = currentMonth;;) {
    dateList.push([year, month]);
    if (month === 0) {
      if (year < beginYear + 1) {
        break;
      }
      month = 11;
      year = year - 1;
    } else {
      month = month - 1;
    }
    if (year < beginYear + 1 && month < beginMonth) {
      break;
    }
  }
  return dateList;
}