/**
 * Created by lipeiwei on 16/10/2.
 */


const alertMessage = '由于开发人员对Android较为熟悉, 所以暂未适配iOS, 等到Android端项目完毕, 就会立刻对iOS进行适配';

//TODO 引入iOS react-native-toast https://github.com/remobile/react-native-toast
function show(message) {
  // console.warn(alertMessage);
}

function showLong(message) {
  // console.warn(alertMessage);
}

export default {
  show,
  showLong
}