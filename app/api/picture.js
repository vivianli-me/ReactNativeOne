/**
 * Created by lipeiwei on 16/10/3.
 */

import {get} from './apiHelper';


/**
 * 拉取首页中的图片列表, 参数为string类型, 如2016-09
 * @return Array
 * @param dateStr
 */
export function getPictureList(dateStr) {
  return get('/hp/bymonth/' + dateStr);
}


const testData = [
  {
    "hpcontent_id": "1476",
    "hp_title": "VOL.1455",
    "author_id": "-1",
    "hp_img_url": "http://image.wufazhuce.com/FqaRcSYDy8MCkaKuVEKLDJNr9zQ6",
    "hp_img_original_url": "http://image.wufazhuce.com/FqaRcSYDy8MCkaKuVEKLDJNr9zQ6",
    "hp_author": "摩纳哥皇宫外&张维托 作品",
    "ipad_url": "http://image.wufazhuce.com/FpLwnN9A8X4o5GtuDm8R4oLmUHqM",
    "hp_content": "不管活到什么岁数，总有太多思索、烦恼与迷惘，一个人如果失去这些，安于现状，才是真正意义上的青春的完结。 by 渡边淳一",
    "hp_makettime": "2016-09-30 23:00:00",
    "last_update_date": "2016-09-21 15:28:50",
    "web_url": "http://m.wufazhuce.com/one/1476",
    "wb_img_url": "",
    "praisenum": 19510,
    "sharenum": 1585,
    "commentnum": 0
  },
  {
    "hpcontent_id": "1478",
    "hp_title": "VOL.1454",
    "author_id": "-1",
    "hp_img_url": "http://image.wufazhuce.com/Fi5UiyYdwTJM-XRAuEy9e_3ScdBk",
    "hp_img_original_url": "http://image.wufazhuce.com/Fi5UiyYdwTJM-XRAuEy9e_3ScdBk",
    "hp_author": "德平庵&豆腐君 作品",
    "ipad_url": "http://image.wufazhuce.com/FvKOw-mRb7j6ra-HfY88pQIwHx6U",
    "hp_content": "我们都有过那样的岁月，爱的时候不顾一切，被爱的时候浑然不觉。 by 路明",
    "hp_makettime": "2016-09-29 21:00:00",
    "last_update_date": "2016-09-26 12:21:56",
    "web_url": "http://m.wufazhuce.com/one/1478",
    "wb_img_url": "",
    "praisenum": 32582,
    "sharenum": 2075,
    "commentnum": 0
  },
  {
    "hpcontent_id": "1481",
    "hp_title": "VOL.1453",
    "author_id": "-1",
    "hp_img_url": "http://image.wufazhuce.com/FmAKCAnoppnwo0PXzbKGwKHZS923",
    "hp_img_original_url": "http://image.wufazhuce.com/FmAKCAnoppnwo0PXzbKGwKHZS923",
    "hp_author": "08年杭七中的大雪&逆行阿星 作品",
    "ipad_url": "http://image.wufazhuce.com/Fq_H6NsA6oqGHeZ8A8qBAKR-R82o",
    "hp_content": "为了你，我把人生的高度设得那么高，以至于人间所有乐事对于我来说全是失落。 by 纪德",
    "hp_makettime": "2016-09-28 21:00:00",
    "last_update_date": "2016-09-23 17:15:55",
    "web_url": "http://m.wufazhuce.com/one/1481",
    "wb_img_url": "",
    "praisenum": 23430,
    "sharenum": 995,
    "commentnum": 0
  },
  {
    "hpcontent_id": "1480",
    "hp_title": "VOL.1452",
    "author_id": "-1",
    "hp_img_url": "http://image.wufazhuce.com/FjxExvko6dtKQatzRV41_q7Kq-m1",
    "hp_img_original_url": "http://image.wufazhuce.com/FjxExvko6dtKQatzRV41_q7Kq-m1",
    "hp_author": "旋律&隽 作品",
    "ipad_url": "http://image.wufazhuce.com/FrGGZ2se6nzf_oU2NP5FQagCiwde",
    "hp_content": "人和人之所以不同，不是因为外貌，而是因为记忆。你看不见，但还是能知道在你身边的人是我，因为我有我们俩之间的记忆，全部都有。而且，这个世界上，只有我拥有这些。对你来说，这就是我独一无二的原因。 from 张寒寺《不正常人类症候群》",
    "hp_makettime": "2016-09-27 23:00:00",
    "last_update_date": "2016-09-23 17:14:19",
    "web_url": "http://m.wufazhuce.com/one/1480",
    "wb_img_url": "",
    "praisenum": 23624,
    "sharenum": 1802,
    "commentnum": 0
  },
  {
    "hpcontent_id": "1483",
    "hp_title": "VOL.1451",
    "author_id": "-1",
    "hp_img_url": "http://image.wufazhuce.com/Fnf2JqdGyEIzeodB-eBGOKCHxSIB",
    "hp_img_original_url": "http://image.wufazhuce.com/Fnf2JqdGyEIzeodB-eBGOKCHxSIB",
    "hp_author": "世上每一个我&禾亭呀 作品",
    "ipad_url": "http://image.wufazhuce.com/FluN_IftPmdYwnscYX9X7GLc86OC",
    "hp_content": "你要做一件事情，会有人泼冷水。你做成了一件事情，会有人唱反调。你做好了一件事情，会有人说你靠运气。碌碌无为者最安全，无所事事者爱嘲笑。前面风景很好看，我们要做的，就是埋头赶路，把嘲笑和质疑丢在风里。走在前面的人，才有资格说，人生真够爽啊。 by 宋小君",
    "hp_makettime": "2016-09-26 23:00:00",
    "last_update_date": "2016-09-26 18:43:52",
    "web_url": "http://m.wufazhuce.com/one/1483",
    "wb_img_url": "",
    "praisenum": 40299,
    "sharenum": 4079,
    "commentnum": 0
  },
  {
    "hpcontent_id": "1482",
    "hp_title": "VOL.1450",
    "author_id": "-1",
    "hp_img_url": "http://image.wufazhuce.com/FkULGu88laLU9b7bp6WPylFSpYq1",
    "hp_img_original_url": "http://image.wufazhuce.com/FkULGu88laLU9b7bp6WPylFSpYq1",
    "hp_author": "牛背山云海星轨&南卡 作品",
    "ipad_url": "http://image.wufazhuce.com/FgjsMOIYRo1FXpZlghQ8x7S7QSMp",
    "hp_content": "我想大多数人的生活就是这样结束的，采取某种态度以适应别人为他们安排的工作和生活， 最后逐渐变得僵化。 from 《大河湾》",
    "hp_makettime": "2016-09-25 23:00:00",
    "last_update_date": "2016-09-23 17:21:12",
    "web_url": "http://m.wufazhuce.com/one/1482",
    "wb_img_url": "",
    "praisenum": 20607,
    "sharenum": 1865,
    "commentnum": 0
  },
  {
    "hpcontent_id": "1479",
    "hp_title": "VOL.1449",
    "author_id": "-1",
    "hp_img_url": "http://image.wufazhuce.com/FtsWqzLKDEd934_cIMbeIluWgb0x",
    "hp_img_original_url": "http://image.wufazhuce.com/FtsWqzLKDEd934_cIMbeIluWgb0x",
    "hp_author": "大雨后的格陵兰岛&龚林轩 作品",
    "ipad_url": "http://image.wufazhuce.com/FuT21w0tR4aOcjcPgXxWE0DbGgnF",
    "hp_content": "凡事若讲“没道理”，其实反而有一个深深的道理在。那些可以在表面上找到原因的事物，大多让人怀疑，因为只是表象。我现在相信，真实的东西往往不需要解释。 by 吕彦妮",
    "hp_makettime": "2016-09-24 23:00:00",
    "last_update_date": "2016-09-26 17:42:55",
    "web_url": "http://m.wufazhuce.com/one/1479",
    "wb_img_url": "",
    "praisenum": 17519,
    "sharenum": 1435,
    "commentnum": 0
  },
  {
    "hpcontent_id": "1474",
    "hp_title": "VOL.1448",
    "author_id": "-1",
    "hp_img_url": "http://image.wufazhuce.com/FuwQfYutB0XmkuZh7PcqI5nPfhnE",
    "hp_img_original_url": "http://image.wufazhuce.com/FuwQfYutB0XmkuZh7PcqI5nPfhnE",
    "hp_author": "三姐妹&lylean lee 作品",
    "ipad_url": "http://image.wufazhuce.com/Fia2BT_bqCdGL8ErWL94DaIQG_8q",
    "hp_content": "如果你拒绝接受我的信，我也照写不误，以便你知道至少有信一直在家等着你。 by 王尔德",
    "hp_makettime": "2016-09-23 23:00:00",
    "last_update_date": "2016-09-18 10:46:54",
    "web_url": "http://m.wufazhuce.com/one/1474",
    "wb_img_url": "",
    "praisenum": 21274,
    "sharenum": 1271,
    "commentnum": 0
  },
  {
    "hpcontent_id": "1475",
    "hp_title": "VOL.1447",
    "author_id": "-1",
    "hp_img_url": "http://image.wufazhuce.com/FuYXbVbqtJBl68o6cfb-b9XapYnT",
    "hp_img_original_url": "http://image.wufazhuce.com/FuYXbVbqtJBl68o6cfb-b9XapYnT",
    "hp_author": "棉花地旁的女人们&小夫 作品",
    "ipad_url": "http://image.wufazhuce.com/Fg52NwYs8dgb0kKxybPEdPGWdlKL",
    "hp_content": "不要失望，甚至对你并不感到失望这一点也不要失望，恰恰在似乎一切都完了的时候，新的力量来临，给你以支柱，而这正表明你是活着的。 from《城堡》\r\n",
    "hp_makettime": "2016-09-22 23:00:00",
    "last_update_date": "2016-09-19 11:18:41",
    "web_url": "http://m.wufazhuce.com/one/1475",
    "wb_img_url": "",
    "praisenum": 19798,
    "sharenum": 2427,
    "commentnum": 0
  },
  {
    "hpcontent_id": "1471",
    "hp_title": "VOL.1446",
    "author_id": "-1",
    "hp_img_url": "http://image.wufazhuce.com/Fqc8XSclaPzob33RYxzck2UWDT7j",
    "hp_img_original_url": "http://image.wufazhuce.com/Fqc8XSclaPzob33RYxzck2UWDT7j",
    "hp_author": "梦：沙漠与湖泊&老老老鱼 作品",
    "ipad_url": "http://image.wufazhuce.com/Fi9LX_P5YFg2pqNYrpaGnBbOCpd2",
    "hp_content": "有成就感的人会把世界看成一个友好的世界，并乐于看到它照原样保持下去，但失意者却会乐于看到世界急遽改变。 by 埃里克·霍弗",
    "hp_makettime": "2016-09-21 23:00:00",
    "last_update_date": "2016-09-16 00:20:36",
    "web_url": "http://m.wufazhuce.com/one/1471",
    "wb_img_url": "",
    "praisenum": 17514,
    "sharenum": 1123,
    "commentnum": 0
  },
  {
    "hpcontent_id": "1473",
    "hp_title": "VOL.1445",
    "author_id": "-1",
    "hp_img_url": "http://image.wufazhuce.com/FtVjJruXQqXd5MuX7Ywkfh6DuYjv",
    "hp_img_original_url": "http://image.wufazhuce.com/FtVjJruXQqXd5MuX7Ywkfh6DuYjv",
    "hp_author": "失眠特曼船&刘晨阳 作品",
    "ipad_url": "http://image.wufazhuce.com/Fn6pgdl28RxYKVNrHkYfT3-YoBdC",
    "hp_content": "理解自身的阴暗，是对付他人阴暗一面的最好方法。 by 荣格",
    "hp_makettime": "2016-09-20 23:00:00",
    "last_update_date": "2016-09-18 10:21:01",
    "web_url": "http://m.wufazhuce.com/one/1473",
    "wb_img_url": "",
    "praisenum": 28761,
    "sharenum": 1896,
    "commentnum": 0
  }
];