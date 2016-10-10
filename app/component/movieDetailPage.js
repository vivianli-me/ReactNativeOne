/**
 * Created by lipeiwei on 16/10/9.
 */
import React, {PropTypes} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import BaseComponent from '../base/baseComponent';
import {getMovieDetail, getMovieStory} from '../api/movie';
import MovieListItem from './movieListItem';
import commonStyle from '../style/commonStyle';
import {parseDate} from '../util/dateUtil';
import monthArray from '../constant/month';
import MovieInfo from './movieInfo';

const styles = StyleSheet.create({
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  rowContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  authorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  authorInfo: {
    marginLeft: 10
  },
  authorName: {
    color: commonStyle.LIGHT_BLUE_COLOR
  },
  timeText: {
    color: commonStyle.TEXT_GRAY_COLOR,
    marginTop: 5
  },
  titleText: {
    marginVertical: 10,
    color: commonStyle.TEXT_COLOR,
    fontSize: 20,
    margin: 10
  },
  contentText: {
    color: commonStyle.TEXT_COLOR,
    fontSize: 16,
    margin: 10
  },
  grayViewContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: commonStyle.LIGHT_GRAY_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lightGrayText: {
    color: commonStyle.TEXT_GRAY_COLOR,
    fontSize: 14
  },
  smallIcon: {
    width: 45,
    height: 45,
  },
});

class MovieDetailPage extends BaseComponent {

  constructor(props) {
    super(props);
    this.renderMovieDetail = this.renderMovieDetail.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      detailMovieData: null,
      movieStory: null
    };
  }

  getNavigationBarProps() {
    return {
      leftButtonImage: require('../image/return.png'),
      hideRightButton: true,
      title: this.props.simpleMovieData.title
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    var movieDetailPromise = getMovieDetail(this.props.simpleMovieData.id);
    var movieStoryPromise = getMovieStory(this.props.simpleMovieData.id);
    Promise.all([movieDetailPromise, movieStoryPromise]).then(response => {
      var detailMovieData = response[0];
      var movieStory = response[1].data[0];
      this.setState({detailMovieData, movieStory});
    }).catch(error => {
      //失败处理
    });
  }

  renderBody() {
    if (this.state.detailMovieData && this.state.movieStory) {
      return this.renderMovieDetail();
    }
    return null;
  }

  renderMovieDetail() {
    const {detailMovieData, movieStory} = this.state;
    const date = parseDate(movieStory.input_date);
    var day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    const dateStr = `${monthArray[date.getMonth()]} ${day}.${date.getFullYear()}`;
    return (
      <ScrollView>
        <View>
          <MovieListItem imageStyle={{height: 200}} cover={detailMovieData.detailcover} score={detailMovieData.score} onPress={this.onTopImagePressed}/>
          <View style={{height: 40}}>

          </View>
          <View style={styles.grayViewContainer}>
            <Text style={styles.lightGrayText}>电影故事</Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.authorInfoContainer}>
              <TouchableOpacity onPress={this.onAvatarImagePress}>
                <Image style={styles.avatarImage} source={{uri: movieStory.user.web_url}}/>
              </TouchableOpacity>
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{movieStory.user.user_name}</Text>
                <Text style={styles.timeText}>{dateStr}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={styles.smallIcon} resizeMode="contain" source={require('../image/laud.png')}/>
              <Text style={{color: commonStyle.TEXT_GRAY_COLOR}}>{movieStory.praisenum}</Text>
            </View>
          </View>
          <Text style={styles.titleText}>{movieStory.title}</Text>
          <Text style={styles.contentText}>{movieStory.content}</Text>
          <MovieInfo detailMovieData={detailMovieData}/>
        </View>
      </ScrollView>
    );
  }

  onTopImagePressed() {

  }

  onAvatarImagePress() {

  }

}

MovieDetailPage.propTypes = {
  simpleMovieData: PropTypes.object.isRequired
};

export default MovieDetailPage;

const detailMovieData = {
  "id": "97",
  "title": "惊天大逆转",
  "indexcover": "http://image.wufazhuce.com/FiOZo99ewwotKWQbng8Hu-eA4Fec",
  "detailcover": "http://image.wufazhuce.com/Fj85K9S4FDP14eNjxfqhYHePhNN7",
  "video": "http://music.wufazhuce.com/lnokoG1Y8yvyz0_SQAR5W24bjQg1",
  "verse": "",
  "verse_en": "",
  "score": "76",
  "revisedscore": "0",
  "review": "用户评分",
  "keywords": "中国队赢了;人皮面具;全韩班底;变态杀手;生死时速",
  "movie_id": "297225637",
  "info": "导演:李骏\r\n编剧:丁小洋\r\n主演:钟汉良/李政宰/郎月婷/李彩英\r\n类型:剧情/悬疑/犯罪\r\n制片国家/地区:中国大陆\r\n语言:汉语普通话/韩语\r\n",
  "officialstory": "影片《惊天大逆转》讲述了一个不断逆转，而玄机重重的故事。心理医生杨曦在首尔进行学术交流期间，接收了一位因烧伤毁容的病人郭志达进行创后心理诊疗辅导。在治疗过程中，杨曦发现这个神秘人似乎在密谋着一个危险的计划。于此同时，首尔正在进行着一场中韩足球对抗赛，决战之际，中方队长的忽然得知，自己的未婚妻被神秘人绑架：这一切都只是危机的开始。",
  "charge_edt": "（责任编辑：朱肖影）",
  "web_url": "http://m.wufazhuce.com/movie/97",
  "praisenum": 0,
  "sort": "0",
  "releasetime": "2016-07-15 00:00:00",
  "scoretime": "2016-07-16 00:00:00",
  "maketime": "2016-07-14 15:00:00",
  "last_update_date": "2016-07-14 15:07:05",
  "read_num": "46800",
  "photo": [
    "http://image.wufazhuce.com/FqSchWXzgZ7-WmqA-hJxQOMFobxb",
    "http://image.wufazhuce.com/FhxtvUro3NqTVV4hziCGxhmnCOPC",
    "http://image.wufazhuce.com/Fi39faNdn4j8Q_egwad4UUEtnKoP",
    "http://image.wufazhuce.com/FoyvMpa9-gcVe0R1GIt-4ktGFEqf",
    "http://image.wufazhuce.com/FvQbk3eUID_j8xIM9pCQSigVOYZB"
  ],
  "sharenum": 89,
  "commentnum": 134,
  "servertime": 1476003481
};

const movieStory = {
  "count": 1,
  "data": [
    {
      "id": "3122",
      "movie_id": "139",
      "title": "最后是你，就好",
      "content": "\r\n时光不老，我们不散。\r\n在杭州，有个女孩子摊开书的扉页，要张嘉佳写下这句话。她的身体带着在户外排队积攒的寒气，脸却是红扑扑的，眼睛里闪着一星亮汪汪的光。\r\n不散呀。\r\n时光的风吹得这么狂乱，要怎么做，我们才不会在人海里走散呢？\r\n\r\n从来没想过，会陪着一本书去全世界流浪。\r\n从初冬下着雨的南京，穿过雾霾蒙蒙的杭州，灯火通明的上海，一路往前，挤在成都寒凉的街头吃夜宵，在重庆滚烫的火锅前把酒满上，在北京西单的地下车库里吹着过堂风，错过广州深圳的人山人海，爬上新街口的十三层楼梯，然后在无锡的夜色里，笑着一路小跑。\r\n穿梭过十座城市，写过七万多个名字。\r\n在每一家书店里，他毫无倦意，抬头对着面前的人微笑，对每一个人说谢谢你。\r\n在辗转奔波的路上，他靠在高铁的车窗边，眼镜还没有摘，就睡着了。胡茬隐约冒出一星半点。\r\n\r\n七万多个名字，路过了谁，又记住了谁？\r\n那些脸色红扑扑的女孩子，那些牵着手站了一路的恋人，那些分享耳机相依而立的陌生人，每一张面孔上，都写着自己独一无二的故事。她们从城市的各个角落赶来，来赴一场柔软的约会。或许真正面对面路过彼此的时间只有一分钟，依然认真地、不舍地、脸红地、纯净地，望着面前的那个人，那张脸，那双手，那些字。\r\n有时候会有一次握手，有时候是一个拥抱，有时候把脸贴在他的发梢，在手机的屏幕上留下一个发烫的微笑。\r\n有个女孩，是自己一个人来的。在队伍里显得很冷静，仔细看，眼眶和鼻翼都是淡淡的红。轮到她的时候，她说，嘉佳，我失恋了，就在半小时之前。说话的时候，那些潮湿的红都在涌动，却没有滚落下来。张嘉佳停下写字的手，认认真真地看着她。没关系，会好起来的。真的会？真的会。\r\n要写摆渡人的女孩，是个看起来脸色微微发白的姑娘，假装不在乎地笑得大大咧咧，说对啊对啊，我就是。快上岸！他也笑着这么说，在她的书上轻轻画下一颗心。她低头一笑，虽然外面下着细雨，书上却写着阳光万里。\r\n如果早点儿看到那个身怀六甲的准妈妈，一定不会让她排那么久的队。但她说，没关系，她想和宝宝一起见证这段故事。当那个孩子长大到可以读懂他的文字，看着签在书上的那一行字，会不会会心一笑？\r\n男生来的时候，总是会抱着一摞书。这一本给她，那一本给她，最重要的一本，请多写一句，就一句。“送你书的那个人，他一直喜欢着你。”男生的书包很大，书很重，手掌发凉，笑容却青涩可爱。要成功啊！张嘉佳说。男生笑着，点头走了。\r\n当然也有很多温暖的碎片。南京的第一场，倾盆大雨，先锋书店绽放的伞花，组团来刷张嘉佳的闺蜜团，从甘肃一大早赶火车来无锡等完全程就为了签最后一本的小傻姑娘，为在海外念书的女儿签书的阿姨，下了飞机就过来踩着高跟鞋排队的空姐团……面孔太多，时间太短，我们从彼此的世界走来，匆匆交会，留下些许祝福，然后各奔前程。\r\n\r\n陪粉丝们排队聊天，也总会有人问我，张嘉佳现实中是什么样子？\r\n这么一想，的确很难下定论。\r\n有时候他很心细，会小心收好每一个人送给他的小礼物，有时候他又很粗线条，去了个饭局，回来丢了刮胡刀，丢了充电器，连隐形眼镜都找不到了。\r\n有人问他，为什么文中会有那么多粗口？他说其实也不算是粗口吧，生活里谁不是这样，对不熟悉的女孩子会称呼美女，对熟人张口就喊贱人。所以喜欢他的人也喜欢用妈蛋直抒胸臆，用呆逼问候平安。冬天的北京大风呼啸，他回酒店的路上摔了一跤，发微博后粉丝们争相嘲讽，欢呼雀跃，比过年还热闹。\r\n一场签售，快的要签四个多小时，久的要签八九个小时。在旁边敲梅茜爪印章的我，坚持从头到尾盖完第一场，半边胳膊就已经废了，后面的场次不得不轮番换人来做完全场。可张嘉佳没法换人，他不吃饭，不喝水，不上厕所，一直签，一直问候，满足读者的所有要求。成都那场签到晚上八点的时候，他的眼睛已经很疼，但人还有那么多，他顾不上滴眼药水。没关系，他说，一会儿就签完了。然后他一直签到九点多。手腕下垂，倒在沙发上，闭着眼睛，缓了好一会儿，然后抬头笑，说其实签到中间真的好想哭啊！\r\n每次出差，从此都记得带上缓解关节疼痛的膏药。\r\n\r\n最后一场签售是在无锡。很意外，没有下雨。\r\n签完最后一本书。吃完庆功饭。呃。又去吃了夜宵。\r\n在无锡不知道哪里的街头的小店里，张嘉佳一边夹起生蹦乱跳的虾子，一边说，其实这里，就是那两年我来过的小店。\r\n是集齐了三百多张车票的那两年么？\r\n是啊。\r\n\r\n所以绕了一个圈，来到当时的原点。\r\n错过的已经错过，未来的还在来。\r\n天会亮起来。真好。",
      "user_id": "7323947",
      "sort": "0",
      "praisenum": 2653,
      "input_date": "2016-09-27 10:56:54",
      "story_type": "1",
      "user": {
        "user_id": "7323947",
        "user_name": "藤堂非（包包）",
        "web_url": "http://image.wufazhuce.com/Fgokkj51mBpKI4SIubGDy1jWSlrT"
      }
    }
  ]
};
