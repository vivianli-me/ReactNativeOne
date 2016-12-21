/**
 * Created by lipeiwei on 16/10/18.
 */

import React, {PropTypes} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ListView,
  PixelRatio,
  Platform
} from 'react-native';
import GiftedListView from '../widget/giftedListView';
import CommentType from '../constant/commentType';
import {getCommentList} from '../api/comment';
import CommentItem from './commentItem';
import commonStyle from '../style/commonStyle';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  separatorView: {
    height: 5,
    backgroundColor: commonStyle.LIGHT_GRAY_COLOR,
    width: windowWidth,
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: commonStyle.GRAY_COLOR,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: commonStyle.GRAY_COLOR,
  },
  grayViewContainer: {
    backgroundColor: commonStyle.LIGHT_GRAY_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lightGrayText: {
    color: commonStyle.TEXT_GRAY_COLOR,
    fontSize: 14,
    marginVertical: 8
  },
});

class CommentListView extends React.Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.fetchMoreData = this.fetchMoreData.bind(this);
    this.fetchLatestData = this.fetchLatestData.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.state = {
      refreshing: false,
      hasMore: true,//是否有更多数据
      commentList: []
    };
    this.lastOneId = 0;
    this.hotCommentIndex = -1;
  }

  //该接口传0代表加载最新的
  fetchLatestData() {
    this.setState({
      refreshing: true
    });
    this.fetchData(0).then(commentList => {
      this.setState({
        refreshing: false,
        hasMore: commentList.length != 0,
        commentList,
      });
    });
  }

  //加载更多
  fetchMoreData() {
    this.fetchData(this.lastOneId).then(newCommentList => {
      let commentList = this.state.commentList.concat(newCommentList);//push只能传元素.concat才能传数组
      this.setState({
        commentList,
        hasMore: newCommentList.length != 0
      });
    });
  }

  fetchData(index) {
    const {type, id} = this.props;
    return getCommentList(type, id, index).then(response => response.data).then(commentList => {
      if (commentList && commentList.length > 0) {
        this.lastOneId = commentList[commentList.length - 1].id;//记录下来
      } else {
        this.lastOneId = -1;
      }
      if (this.hotCommentIndex === -1) {
        this.hotCommentIndex = this.getHotCommentIndex(commentList);
      }
      return commentList;
    });
  }

  //TODO removeClippedSubviews
  render() {
    //pageSize代表一个event loop绘制多少个row
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.commentList);
    let removeClippedSubviews = true;
    if (Platform.OS === 'ios' && 'removeClippedSubviews' in this.props
            && typeof this.props.removeClippedSubviews === 'boolean') {
      removeClippedSubviews = this.props.removeClippedSubviews;//该bug只在iOS下出现
    }
    return (
      <GiftedListView
        removeClippedSubviews={removeClippedSubviews}
        initialListSize={20}
        pageSize={20}
        refreshing={this.state.refreshing}
        hasMore={this.state.hasMore}
        fetchLatestData={this.fetchLatestData}
        fetchMoreData={this.fetchMoreData}
        dataSource={dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        renderHeader={this.props.renderHeader}
      />
    );
  }

  renderRow(commentData, sectionID, rowID) {
    return (
      <CommentItem key={rowID} commentData={commentData}/>
    );
  }

  renderSeparator(sectionID, rowID) {
    //typeof rowID === 'string'  切记
    if (rowID == this.hotCommentIndex) {
      return (
        <View style={styles.grayViewContainer} key={rowID}>
          <Text style={styles.lightGrayText}>以上是热门评论</Text>
        </View>
      );
    }
    return (
      <View key={rowID} style={styles.separatorView}/>
    );
  }

  //
  getHotCommentIndex(commentList) {
    if (!commentList || commentList.length <= 1) {
      return -1;
    }
    for (let i = 0; i < commentList.length - 2; i++) {
      if (commentList[i + 1].type > commentList[i].type) {
        return i;
      }
    }
    return -1;
  }

}

CommentListView.propTypes = {
  renderHeader: PropTypes.func.isRequired,
  type: PropTypes.oneOf([CommentType.ESSAY, CommentType.SERIAL, CommentType.QUESTION, CommentType.MUSIC, CommentType.MOVIE]),
  id: PropTypes.number.isRequired,
};

export default CommentListView;

















