/**
 * Created by lipeiwei on 16/10/6.
 */


import React, {PropTypes} from 'react';
import {
  ListView,
  ScrollView,
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  InteractionManager
} from 'react-native';
import BaseComponent from '../base/baseComponent';
import {getSerialDetailInfo} from '../api/reading';
import commonStyle from '../style/commonStyle';
import {parseDate} from '../util/dateUtil';
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 25
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
    color: commonStyle.TEXT_COLOR,
    fontSize: 20,
    padding: 10
  },
  contentText: {
    color: commonStyle.TEXT_COLOR,
    fontSize: 16,
    padding: 10
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

class ReadingSerialDetail extends BaseComponent {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.renderArticleContent = this.renderArticleContent.bind(this);
    this.onAvatarImagePress = this.onAvatarImagePress.bind(this);
    this.onSharePressed = this.onSharePressed.bind(this);
    this.state = {
      detailData: null,
      loadingStatus: LoadingManagerView.Loading
    };
  }

  getNavigationBarProps() {
    return {
      title: '连载',
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
      getSerialDetailInfo(this.props.id).then(detailData => {
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
      console.warn(`the component 'ReadingSerialDetail' should has 'this.props.id'`);
    }
  }

  renderBody() {
    const {loadingStatus, detailData} = this.state;
    if (loadingStatus === LoadingManagerView.LoadingSuccess) {
      return (
        <View style={{flex: 1}}>
          <CommentListView
            renderHeader={this.renderArticleContent}
            type={CommentType.SERIAL}
            id={parseInt(detailData.id)}/>
          <BottomInfo
            praiseNum={detailData.praisenum}
            commentNum={detailData.commentnum}
            shareNum={detailData.sharenum}
            onSharePressed={this.onSharePressed}/>
        </View>
      );
    }
    return (
      <LoadingManagerView status={loadingStatus} onFetchData={this.fetchData}/>
    );
  }

  renderArticleContent() {
    const {detailData} = this.state;
    const date = parseDate(detailData.maketime);
    var day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    const dateStr = `${monthArray[date.getMonth()]} ${day}.${date.getFullYear()}`;
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={this.onAvatarImagePress}>
            <Image style={styles.avatarImage} source={{uri: detailData.author.web_url}}/>
          </TouchableOpacity>
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{detailData.author.user_name}</Text>
            <Text style={styles.timeText}>{dateStr}</Text>
          </View>
        </View>
        <Text style={styles.titleText}>{detailData.title}</Text>
        <Text style={styles.contentText}>{detailData.content}</Text>
        <View style={styles.grayViewContainer}>
          <Text style={styles.lightGrayText}>评论列表</Text>
        </View>
      </View>
    );
  }

  onAvatarImagePress() {
    //头像点击
  }

  onSharePressed() {
    const {detailData} = this.state;
    getNavigator().push({
      name: 'SharePage',
      shareData: {
        type: 'news',
        webpageUrl: detailData.web_url,
        thumbImage: 'ic_launcher',
        title: `《${detailData.title}》`,
        description: `作者/ ${detailData.author.user_name} ${detailData.excerpt}`
      }
    });
  }

}

ReadingSerialDetail.propTypes = {
  id: PropTypes.number.isRequired
};

export default ReadingSerialDetail;

const simpleData = {
  "id": "184",
  "serial_id": "33",
  "number": "4",
  "title": "玩家·第四话",
  "excerpt": "5W，你到底是不慎容纳了一些怪胎，还是本身就是按照一个怪胎集中营来设计的？",
  "read_num": "17100",
  "maketime": "2016-10-04 21:00:00",
  "author": {
    "user_id": "4813765",
    "user_name": "夜X",
    "web_url": "http://image.wufazhuce.com/Fkr-24izoJEPeeKJ0Zwga9xB325N",
    "desc": "作家，编剧。公众号：不投币故事贩卖机"
  },
  "has_audio": false
};

const detailData = {
  "id": "184",
  "serial_id": "33",
  "number": "4",
  "title": "玩家·第四话",
  "excerpt": "5W，你到底是不慎容纳了一些怪胎，还是本身就是按照一个怪胎集中营来设计的？",
  "charge_edt": "（责任编辑：金子棋）",
  "content": '',
  "read_num": "22600",
  "maketime": "2016-10-04 21:00:00",
  "last_update_date": "2016-10-04 20:56:29",
  "audio": "",
  "web_url": "http://m.wufazhuce.com/serial/184",
  "input_name": "10028",
  "last_update_name": "金子棋",
  "author": {
    "user_id": "4813765",
    "user_name": "夜X",
    "web_url": "http://image.wufazhuce.com/Fkr-24izoJEPeeKJ0Zwga9xB325N",
    "desc": "作家，编剧。公众号：不投币故事贩卖机"
  },
  "praisenum": 413,
  "sharenum": 20,
  "commentnum": 266
};
