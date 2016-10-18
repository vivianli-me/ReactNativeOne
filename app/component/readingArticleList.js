/**
 * Created by lipeiwei on 16/10/5.
 */

import React, {PropTypes, Component} from 'react';
import {
  ListView,
  StyleSheet,
  InteractionManager
} from 'react-native';
import ReadingArticleItem from './readingArticleItem'
import {getSpecifiedTypeArticleList} from '../api/reading';
import BaseComponent from '../base/baseComponent';
import monthArray from '../constant/month';
import LoadingManagerView from './loadingManagerView';

const styles = StyleSheet.create({
  listView: {
    flex: 1
  }
});

class ReadingArticleList extends BaseComponent {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.fetchData = this.fetchData.bind(this);
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let loadingStatus = LoadingManagerView.Loading;
    if (this.props.articleList) {
      dataSource = dataSource.cloneWithRows(this.props.articleList);
      loadingStatus = LoadingManagerView.LoadingSuccess;
    }
    this.state = {
      dataSource,
      loadingStatus
    };
  }

  getNavigationBarProps() {
    return {
      hideRightButton: true,
      title: `${monthArray[this.props.month]}.${this.props.year}`,
      leftButtonImage: require('../image/return.png')
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchData);
  }

  fetchData() {
    //本来是用if(year && month && index)来判断, 但比如当index==0的时会有问题
    if ('year' in this.props && 'month' in this.props && 'index' in this.props) {
      this.setState({//加载
        loadingStatus: LoadingManagerView.Loading
      });
      const {year, month, index} = this.props;
      getSpecifiedTypeArticleList(year, month, index).then(articleList => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(articleList),
          loadingStatus: LoadingManagerView.LoadingSuccess
        });
      }).catch(() => {
        this.setState({
          loadingStatus: LoadingManagerView.LoadingError
        });
      });
    }
  }

  //更新props
  componentWillReceiveProps(newProps) {
    if (newProps.articleList && newProps.articleList !== this.props.articleList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.articleList)
      });
    }
  }

  //在iOS平台下
  //react-native-scrollable-tab-view嵌套react-native-viewpager
  //react-native-viewpager再嵌套ListView的情况下, 必须得加removeClippedSubviews={false}
  //否则ViewPager表现不正常 ,原因至今未明
  renderBody() {
    const {loadingStatus, dataSource} = this.state;
    if (loadingStatus === LoadingManagerView.LoadingSuccess) {
      return (
        <ListView
          removeClippedSubviews={false}
          style={styles.listView}
          dataSource={dataSource}
          renderRow={this.renderRow}/>
      );
    }
    return (
      <LoadingManagerView status={loadingStatus} onFetchData={this.fetchData}/>
    );
  }

  renderRow(data) {
    return (
      <ReadingArticleItem data={data}/>
    );
  }

}

ReadingArticleList.propTypes = {
  articleList: PropTypes.array,

  year: PropTypes.number,
  month: PropTypes.number,
  index: PropTypes.number
};

export default ReadingArticleList;