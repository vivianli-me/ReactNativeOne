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
        <View style={{flex: 1}}>
          <CommentListView
            renderHeader={this.renderArticleContent}
            type={CommentType.QUESTION}
            id={parseInt(detailData.question_id)}/>
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
