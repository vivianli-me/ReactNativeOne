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
import {getEssayDetailInfo} from '../api/reading';
import commonStyle from '../style/commonStyle';
import {parseDate} from '../util/dateUtil';
import monthArray from '../constant/month';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {stopPlayMedia, startPlayMedia} from '../actions/media';
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
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
    marginVertical: 10,
    color: commonStyle.TEXT_COLOR,
    fontSize: 20,
    padding: 10,
  },
  contentText: {
    color: commonStyle.TEXT_COLOR,
    fontSize: 16,
    padding: 10,
  },
  smallIcon: {
    width: 30,
    height: 30
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

class ReadingEssayDetail extends BaseComponent {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.renderArticleContent = this.renderArticleContent.bind(this);
    this.onAvatarImagePress = this.onAvatarImagePress.bind(this);
    this.renderMediaButton = this.renderMediaButton.bind(this);
    this.onMediaPressed = this.onMediaPressed.bind(this);
    this.onSharePressed = this.onSharePressed.bind(this);
    this.state = {
      detailData: null,
      loadingStatus: LoadingManagerView.Loading
    };
  }

  getNavigationBarProps() {
    return {
      title: '短篇',
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
      getEssayDetailInfo(this.props.id).then(detailData => {
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
      console.warn(`the component 'ReadingEssayDetail' should has 'this.props.id'`);
    }
  }

  renderBody() {
    const {loadingStatus, detailData} = this.state;
    if (loadingStatus === LoadingManagerView.LoadingSuccess) {
      return (
        <View style={{flex: 1}}>
          <CommentListView
            renderHeader={this.renderArticleContent}
            type={CommentType.ESSAY}
            id={parseInt(detailData.content_id)}/>
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
    const date = parseDate(detailData.hp_makettime);
    var day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    const dateStr = `${monthArray[date.getMonth()]} ${day}.${date.getFullYear()}`;
    return (
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={this.onAvatarImagePress}>
                <Image style={styles.avatarImage} source={{uri: detailData.author[0].web_url}}/>
              </TouchableOpacity>
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{detailData.hp_author}</Text>
                <Text style={styles.timeText}>{dateStr}</Text>
              </View>
            </View>
            {this.renderMediaButton()}
          </View>
          <Text style={styles.titleText}>{detailData.hp_title}</Text>
          <Text selectable={true} style={styles.contentText}>{detailData.hp_content}</Text>
          <View style={styles.grayViewContainer}>
            <Text style={styles.lightGrayText}>评论列表</Text>
          </View>
        </View>
    );
  }

  onAvatarImagePress() {
    //头像点击
  }

  renderMediaButton() {
    const {detailData} = this.state;
    if (!detailData.audio) {//无音频
      return null;
    }
    const {
      isPlaying,
    } = this.props;
    return (
      <TouchableOpacity onPress={this.onMediaPressed}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={styles.smallIcon} resizeMode="contain"
                 source={isPlaying ? require('../image/article_pause.png') : require('../image/article_play.png')}/>
          <Text>{isPlaying ? '暂停' : '收听'}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  onMediaPressed() {
    const {detailData} = this.state;
    const {isPlaying, id, stopPlayMedia, startPlayMedia} = this.props;
    if (isPlaying) {
      stopPlayMedia();
    } else {
      startPlayMedia({
        id: id,
        url: detailData.audio,
        type: 'essay',
        musicName: detailData.hp_title,
        authorName: detailData.hp_author
      });
    }
  }

  onSharePressed() {
    const {detailData} = this.state;
    getNavigator().push({
      name: 'SharePage',
      shareData: {
        type: 'news',
        webpageUrl: detailData.web_url,
        thumbImage: 'ic_launcher',
        title: `《${detailData.hp_title}》` ,
        description: `作者/ ${detailData.hp_author} ${detailData.guide_word}`
      }
    });
  }

}

ReadingEssayDetail.propTypes = {
  id: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  stopPlayMedia: PropTypes.func.isRequired,
  startPlayMedia: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  var media = state.media;
  var currentMedia = media.mediaList[media.currentIndex];
  return {
    isPlaying: media.isPlayingMedia && currentMedia && currentMedia.type === 'essay' && currentMedia.id === props.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    stopPlayMedia: bindActionCreators(stopPlayMedia, dispatch),
    startPlayMedia: bindActionCreators(startPlayMedia, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadingEssayDetail);


