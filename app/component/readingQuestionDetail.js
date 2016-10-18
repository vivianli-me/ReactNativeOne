/**
 * Created by lipeiwei on 16/10/6.
 */

import React, {PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  InteractionManager
} from 'react-native';
import BaseComponent from '../base/baseComponent';
import {parseDate} from '../util/dateUtil'
import {getQuestionDetailInfo} from '../api/reading'
import commonStyle from '../style/commonStyle';
import monthArray from '../constant/month';
import BottomInfo from './bottomInfo';
import {getNavigator} from '../route';
import LoadingManagerView from './loadingManagerView';
import CommentListView from './commentListView';
import CommentType from '../constant/commentType';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionTitle: {
    color: 'black',
    fontSize: 20
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  separatorLine: {
    height: 1,
    backgroundColor: commonStyle.GRAY_COLOR,
    marginVertical: 20
  },
  contentText: {
    color: commonStyle.TEXT_COLOR,
    fontSize: 16,
    marginVertical: 10
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

class ReadingQuestionDetail extends BaseComponent {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.renderArticleContent = this.renderArticleContent.bind(this);
    this.onSharePressed = this.onSharePressed.bind(this);
    this.state = {
      detailData: null,
      loadingStatus: LoadingManagerView.Loading
    };
  }

  getNavigationBarProps() {
    return {
      title: '问题',
      hideRightButton: true,
      leftButtonImage: require('../image/return.png')
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchData);
  }

  fetchData() {
    if (this.props.id){
      this.setState({//加载
        loadingStatus: LoadingManagerView.Loading
      });
      getQuestionDetailInfo(this.props.id).then(detailData => {
        this.setState({
          detailData,
          loadingStatus: LoadingManagerView.LoadingSuccess//加载成功
        });
      }).catch(() => {
        this.setState({
          loadingStatus: LoadingManagerView.LoadingError//加载失败
        });
      });
    } else {
      console.warn(`the component 'ReadingQuestionDetail' should has 'this.props.id'`);
    }
  }

  renderBody() {
    const {loadingStatus, detailData} = this.state;
    if (loadingStatus === LoadingManagerView.LoadingSuccess) {
      return (
        <CommentListView
          renderHeader={this.renderArticleContent}
          type={CommentType.QUESTION}
          id={parseInt(detailData.question_id)}/>
      );
    }
    return (
      <LoadingManagerView status={loadingStatus} onFetchData={this.fetchData}/>
    );
  }

  renderArticleContent() {
    const {detailData} = this.state;
    const date = parseDate(detailData.question_makettime);
    var day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    const dateStr = `${monthArray[date.getMonth()]} ${day}.${date.getFullYear()}`;
    return (
      <View style={styles.container}>
        <View style={{margin: 10}}>
          <Text style={styles.questionTitle}>{detailData.question_title}</Text>
          <Text style={styles.contentText}>{detailData.question_content}</Text>
          <View style={styles.separatorLine}/>
          <View style={styles.rowContainer}>
            <Text style={styles.contentText}>{detailData.answer_title}</Text>
            <Text>{dateStr}</Text>
          </View>
          <Text style={styles.contentText}>{detailData.answer_content}</Text>
        </View>
        <BottomInfo
          praiseNum={detailData.praisenum}
          commentNum={detailData.commentnum}
          shareNum={detailData.sharenum}
          onSharePressed={this.onSharePressed}/>
        <View style={styles.grayViewContainer}>
          <Text style={styles.lightGrayText}>评论列表</Text>
        </View>
      </View>
    );
  }

  onSharePressed() {
    const {detailData} = this.state;
    getNavigator().push({
      name: 'SharePage',
      shareData: {
        type: 'news',
        webpageUrl: detailData.web_url,
        thumbImage: 'ic_launcher',
        title: `${detailData.question_title}`,
        description: `${detailData.question_content}`
      }
    });
  }

}

ReadingQuestionDetail.propTypes = {
  id: PropTypes.number.isRequired
};

export default ReadingQuestionDetail;

const detailData = {
  "question_id": "1495",
  "question_title": "古代养宠物有危险吗？",
  "question_content": "金文弧问：听说古代人民轻易不会养宠物，养宠物是件很危险的事情。那么究竟是会有什么危险呢？",
  "answer_title": "@辉城啊 答金文弧：",
  "answer_content": "先说结论，风险非常大。<br>\n <br>\n古代不比现代，养宠物不但有道德的非议，更有政治上的风险。<br>\n <br>\n古代中国，长期处于农耕社会。老百姓要生活，得面向黄土背朝天，辛苦耕耘。一般人家，养只猫狗，用来看家护院、捉拿老鼠。猫狗的功用性强，乃是家畜，不是宠物。<br>\n <br>\n如今一般的家庭，都能养得起一两只猫狗。古代可不行，人吃饭都有问题，宠物就更有问题了。所以，把猫狗当宠物来养的，家庭条件必须要过得去。达官贵人、商贾富人，不愁吃穿的阶层，才能养得起宠物。清末许多八旗子弟，养狗养鸟，就是属于这种状况。<br>\n <br>\n养宠物倒是没什么，但架不住邻里邻外的道德批判。比如说，商人之家，养了只狗，就会引起邻居的最大的恶意猜测。<br>\n <br>\n商人重利轻别离，做生意的，得游走于五湖四海，才会有利润。路途遥远，又不能携妻带子。妻子守家，难免孤独寂寞，一些浪荡子就会趁虚而入，勾引之。若是心意坚定，不为外界诱惑所动，只好独守空房。商贾之家，有闲钱，养猫养狗，聊以度日。养了狗，麻烦就来了，外界会传出难听的风言风语，作一个道德的评判。寡妇门前是非多，独守空房的女人门前，是非更多。所谓“男不养猫，女不养狗”即是也。人喜欢通过性事上面，去侮辱和摧毁他人。一旦传出“人与狗交”的谣言，那她就成为整个乡村或周边可侮辱、可欺凌的对象了。<br>\n <br>\n捕风捉影的谣言，并非是没有“根据”。因为“人与狗交”的情况，常常有之。蒲松龄在《犬奸》中，写有一名青城商人妇，在丈夫离家做生意之时，与家中白狗一起，度过漫漫长夜。蒲松龄姑且是小说家语，不过侧重于“史实”的纪晓岚《阅微草堂笔记》中，也有狗妻的记载。可见，若是遇见女子养狗，定然会把许多离奇的事迹，安放在她身上。<br>\n <br>\n道德风险也就罢了，因为谣言总会有澄清的一天。养宠物变成一桩政治事件，那可是麻烦大了。干宝在《搜神记》中，记载一则《狗冠》：汉昭帝之时，昌邑王刘贺看见一个无尾狗戴着帽子。到了汉灵帝熹平年间，皇宫流行给狗戴帽子和绶带，以此取乐。有一天，有只狗突然跑出皇宫，老百姓见到了，觉得非常奇怪。京房《易传》对此评论是“君上不正，臣下像想要谋反，征兆就是狗戴上帽子跑出城门”。<br>\n <br>\n现在看来，这段评论，无疑是上纲上线。但在汉灵帝之时，宦官专权，朝纲紊乱，民不聊生， “狗冠”乃是讽刺宦官。其实，在每个王朝末年，老百姓都生活在动荡之中，缺乏恒定的安全感。“狗冠”，从另外一个角度来理解，乃是“朱门酒肉臭，路有冻死骨”。狗如人样，人不如狗，阶级矛盾之深，可想而知。<br>\n <br>\n不单单是狗，老百姓喜欢观察“异象”，来预测政治动态。比如说，皇宫里两蛇打架，乃是有宫斗。人生角、狗生角、女化男等，都可以用来解释天下大乱。养了宠物狗，打扮得人模狗样，更是会刺痛老百姓的神经了。<br>\n <br>\n所以，养宠物最大的风险是政治风险。",
  "question_makettime": "2016-10-05 23:00:00",
  "recommend_flag": "0",
  "charge_edt": "（责任编辑：卫天成 weitiancheng@wufazhuce.com）",
  "last_update_date": "2016-10-06 09:09:12",
  "web_url": "http://m.wufazhuce.com/question/1495",
  "read_num": "24300",
  "guide_word": "在古代，养宠物最大的风险是政治风险。",
  "praisenum": 274,
  "sharenum": 25,
  "commentnum": 131
};