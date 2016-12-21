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
  Text,
  InteractionManager
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
    InteractionManager.runAfterInteractions(() => {
      this.fetchData(this.props.id);
    });
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
        <LoadingManagerView status={loadingStatus} onFetchData={() => this.fetchData(this.props.id)}/>
      );
    }

    if (process.env.NODE_ENV !== 'production') {
      return (
        <ScrollView>
          {this.renderMusicDetail()}
        </ScrollView>
      );
    }
    
    //以下在测试环境下滑动不正常, release版本正常
    return (
      <CommentListView
        removeClippedSubviews={false}
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


