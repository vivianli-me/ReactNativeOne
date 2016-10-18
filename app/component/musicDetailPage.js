/**
 * Created by lipeiwei on 16/10/10.
 */

import React, {PropTypes} from 'react';
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text
} from 'react-native';
import {getMusicDetail} from '../api/music';
import MusicInfo from './musicInfo';
import MusicPlay from './musicPlay';
import commonStyle from '../style/commonStyle';
import BaseComponent from '../base/baseComponent';
import BottomInfo from './bottomInfo';
import {getNavigator} from '../route';
import LoadingManagerView from './loadingManagerView';
import CommentListView from './commentListView';
import CommentType from '../constant/commentType';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  topImage: {
    width: windowWidth,
    height: windowHeight / 3 * 1//暂时占屏幕高度三分之一
  },
  grayText: {
    color: commonStyle.TEXT_GRAY_COLOR,
    margin: 15,
    fontSize: 12
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
});

class MusicDetailPage extends BaseComponent {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.onSharePressed = this.onSharePressed.bind(this);
    this.renderMusicDetail = this.renderMusicDetail.bind(this);
    this.state = {
      musicDetailData: null,
      loadingStatus: LoadingManagerView.Loading
    };
  }

  getNavigationBarProps() {
    return {
      hideNav: false,
      hideLeftButton: false,
      hideRightButton: true,
      title: '单曲',
      leftButtonImage: require('../image/return.png')
    };
  }

  componentDidMount() {
    this.fetchData(this.props.id);
  }

  fetchData(id) {
    this.setState({//加载
      loadingStatus: LoadingManagerView.Loading
    });
    getMusicDetail(id).then(musicDetailData => {
      this.setState({
        musicDetailData,
        loadingStatus: LoadingManagerView.LoadingSuccess
      });
    }).catch(() => {
      this.setState({//加载
        loadingStatus: LoadingManagerView.LoadingError
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.fetchData(nextProps.id);
    }
  }

  renderBody() {
    const {loadingStatus, musicDetailData} = this.state;
    if (loadingStatus !== LoadingManagerView.LoadingSuccess) {
      return (
        <LoadingManagerView status={loadingStatus} onFetchData={this.fetchData}/>
      );
    }

    return (
      <CommentListView
        renderHeader={this.renderMusicDetail}
        type={CommentType.MUSIC}
        id={parseInt(musicDetailData.id)}/>
    );

  }

  renderMusicDetail() {
    const {musicDetailData} = this.state;
    //当数据还未请求到时, 不能直接返回null, 因为这里是作为ViewPager的子View
    //如果请求数据前后子View的大小宽高变化的话, 会产生跳动
    const {praisenum, commentnum, sharenum} = musicDetailData;
    //TODO 如何在Android平台实现类似contentOffset这样的功能属性, 拒绝重新渲染滚动, 否则体验很差
    return (
      <View>
        <Image style={styles.topImage} resizeMode="cover" source={{uri: musicDetailData.cover}}/>
        <MusicPlay musicDetailData={musicDetailData}/>
        <MusicInfo musicDetailData={musicDetailData}/>
        <Text style={styles.grayText}>{musicDetailData.charge_edt}</Text>
        <BottomInfo
          praiseNum={praisenum}
          commentNum={commentnum}
          shareNum={sharenum}
          onSharePressed={this.onSharePressed}/>
        <View style={styles.grayViewContainer}>
          <Text style={styles.lightGrayText}>评论列表</Text>
        </View>
      </View>
    );
  }

  onSharePressed() {
    const {musicDetailData} = this.state;
    getNavigator().push({
      name: 'SharePage',
      shareData: {
        type: 'news',
        webpageUrl: musicDetailData.web_url,
        thumbImage: musicDetailData.cover,
        title: `${musicDetailData.author.user_name} 《${musicDetailData.title}》` ,
        description: musicDetailData.story.slice(0, 100) + '...'//文字太长无法分享 进行截断
      }
    });
  }

}

MusicDetailPage.propTypes = {
  id: PropTypes.number.isRequired
};

export default MusicDetailPage;

const musicDetailData = {
  "id": "1062",
  "title": "浪费",
  "cover": "http://image.wufazhuce.com/FhEXRqBrcVbely6P-TuDNvmTzPtP",
  "isfirst": "0",
  "story_title": "你看那个人，怎么还是像条狗",
  "story": "三年以前再以前，那会儿我意气风发，豪情壮志，渴望号令天下豪杰，干出一番事业。我如同一个西方记者，无时无刻都想搞个大新闻。但是事与愿违，后来我选择回归了平淡的人生，直到现在我仍会想起我那些拼搏的岁月，不禁唏嘘。对了，忘了说，那会儿，我刚上高二。<br>\r\n<br>\r\n人生中总有那么些个高不成低不就的时期，在那个时期我们瞧不起一切比我们弱的东西，张嘴说话都感觉在恭维身边愚蠢的人类，而高二正是这个时期最完美的体现。会写一个小故事的高二学生就觉得自己未来可以当个作家；看了几部电影的高二学生就觉得自己未来一定能是个导演；会说笑话逗女孩子笑的高二学生就觉得自己未来一定是个花花公子。而那会儿的我是一个会写搞笑电影剧本的高二学生，在当时我觉得我的未来，一定……会飞。<br>\r\n<br>\r\n我在高二认识的N，我就是在一个觉得自己会飞的时期里喜欢上了她，所以她一定得是个仙女。她以为她接受的是谁的爱！是一个天神的爱啊！《大鱼海棠》里最中二的台词却是我觉得最符合实际的一句话。在那个中二值爆表的时期里，她近乎成为了我生命中类似图腾的一种存在，在我的设定里她必须是属于我的，我会踩着七彩祥云找个机会跟她结婚，然后在众天使的簇拥下走进帐房，站在我俩中间的老和尚会为我俩诵经祈祷，后来我就明白了，天使跟和尚他俩注定就不是一伙的。<br>\r\n <br>\r\n她总是给我推荐一些奇奇怪怪的电影和歌，都是我不喜欢的那种，但为了和她有更多话题，我只好拼命地听下去，结果越听越有滋味。我们总一起讨论些莫名其妙的问题，然后相互调侃对方三观不正，可三观不正的我们歪向了一遍，所以我们很合，合得像哥们。<br>\r\n <br>\r\n回到那个烂俗的问题，男女之间是否有纯粹的友谊。我非常羡慕身边那些因为女朋友和妈妈同时掉水里而困惑的哥们，因为毕竟他们有个女朋友。而困扰我的问题永远是上一个。<br>\r\n <br>\r\n高中三年我没有谈过一场像样的恋爱，甚至可以说没有努力地去追过女孩，但是我却非常努力地追了一个男孩。别误会，是帮她追的。后来他们分手了，再后来她有又了新的男友。这么多年过去，记不住看了她多少次分分合合，而我们的关系似乎还停留在中学时代，在深夜的聊天里开一些常人无法理解的脑洞。<br>\r\n <br>\r\n至于我自己呢？直到去年退伍之后，我才交了一个不走心纯走肾的女朋友，连牵手走在路上都会觉得莫名难过。分手时的喜悦嗨过嗑药，人家太宰治先生是非常文艺的人间失格，到我这基本就是粗暴的翻译了一下：我他妈就不配拥有爱情，只配做条单身的狗。<br>\r\n <br>\r\n汪汪。<br>\r\n <br>\r\n高中时帮N追到的那个男生其实是我的朋友，可和N在一起后他却介意起我这个“媒人”。那时候用手机的高中生还不多，传纸条这种最原始的聊天方式依然流行。于是，自习课上他用纸条大声地呵斥我“你他妈到底想干什么的时候”，我在纸条上写下了一句：我想看着她结婚生子，直到生老病死。现在看来全是病句，但是当时写的我热血沸腾，因为我终于明白我做这些为了什么。<br>\r\n<br>\r\n因为我始终爱着N。<br>\r\n <br>\r\n前些天N在朋友圈晒了高中的记事本，那一页写着我曾给她下载过的许多电影。看着上面的日期，猛然间察觉我俩已经相识七年。我不知道七年之痒的定义是什么，总之我俩七年互相谁都没痒过，多半是废了。刚认识的时候她还能出现在我的春梦里，和我来个传教士什么的，现如今她要是再出现在我的梦里，她也就只能当个传教士了。<br>\r\n <br>\r\n一般那些堂而皇之地跟人家说这件事我不后悔的人，肠子的颜色都偏青，对于N的这件事情上，我整个人都是青色的。我很后悔认识了她，爱上了她。即便如此，我还是会经常想起她，那种不经意，时常让我自己措手不及。<br>\r\n<br>\r\n只是因为我还爱着N。<br>\r\n<br>\r\n爱其实没那么多种方式，无非就是得到和得不到。我属于得不到那种，而且是从一开始就明白我不可能得到的爱。而我做的这些却都是因为爱。就像那些对游戏喜爱至极的人才说的那句话一样：垃圾游戏毁我人生。恨之切爱之深。<br>\r\n<br>\r\n浪费，就是一个消费浪漫的过程。我要享受的是过程，而不是结果上的得失。她知不知道我爱她呢？大概吧。那么其实她爱不爱我呢？也许吧。可这些都不重要。<br>\r\n <br>\r\n因为无论过了多久，我都像是那条狗，一条懂得浪费人生的狗。<br>\r\n<br>\r\n<br>\r\n作者介绍：<br>\r\n萧，一条无聊的编剧狗。<br>\r\n<br>\r\n ",
  "lyric": "多久了 我都没变／爱妳这回事 整整六年／妳最好 做好准备／我没有打算 停止一切\r\n\r\n想说我没有志愿／也没有事情好消遣／有一个人能去爱 多珍贵\r\n\r\n没关系妳也不用给我机会／反正我还有一生可以浪费／我就是剩这么一点点倔 称得上 我的优点\r\n\r\n没关系妳也不用对我惭愧／也许我根本喜欢被妳浪费／随便妳今天拼命爱上谁 我都会 坦然面对／即使要我跟妳再耗个十年 无所谓\r\n\r\n妳和他 没有如愿 ／短短半年内 开始分裂／我的爱 依旧没变／连我自己都 对我钦佩\r\n\r\n有的是很多资源／我有的是很多时间／不去爱才是浪费 多不对\r\n\r\n没关系妳也不用给我机会／反正我还有一生可以浪费／我就是剩这么一点点倔 称得上 我的优点\r\n\r\n没关系妳也不用对我惭愧／也许我根本喜欢被妳浪费／就算我再去努力爱上谁 到头来 也是白费／不如永远跟妳耗 来得快乐 对不对",
  "info": "所属专辑：大小说家\r\n演唱者：林宥嘉\r\n作词：陈信延\r\n作曲：郑楠\r\n编曲：张晁毓\r\n唱片公司：华研国际\r\n发行时间：2012年06月22日\r\n专辑类别：录音室专辑",
  "platform": "1",
  "music_id": "1771093941",
  "charge_edt": "（责任编辑：十三妹 shisanmei@wufazhuce.com）",
  "related_to": "0",
  "web_url": "http://h.xiami.com/one-share.html?id=1771093941",
  "praisenum": 1101,
  "sort": "0",
  "maketime": "2016-10-07 21:00:00",
  "last_update_date": "2016-10-07 21:20:44",
  "read_num": "190506",
  "author": {
    "user_id": "6144260",
    "user_name": "林宥嘉",
    "web_url": "http://image.wufazhuce.com/FlQyxQX7RdnZRsqVAhH5qgV6vXo6",
    "desc": "台湾歌手"
  },
  "story_author": {
    "user_id": "7330170",
    "user_name": "萧",
    "web_url": "http://image.wufazhuce.com/Fk-voezyu4ZAaj3WeJCaip6gnHZV"
  },
  "sharenum": 529,
  "commentnum": 535
};

