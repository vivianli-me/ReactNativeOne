/**
 * Created by lipeiwei on 16/10/5.
 */

import React, {PropsType, Component} from 'react';
import {
  StyleSheet,
  InteractionManager
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import {getLatestArticleList} from '../api/reading';
import ReadingArticleList from './readingArticleList'
import Toast from '../util/toast';
import {getNavigator} from '../route';
import LoadingManagerView from './loadingManagerView';

const styles = StyleSheet.create({

});

class ReadingBottomViewPager extends Component {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      dataSource: new ViewPager.DataSource({
        pageHasChanged: (p1, p2) => p1 !== p2,
      }),
      loadingStatus: LoadingManagerView.Loading
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchData);
  }

  refactorArray(data) {
    let newDataList = [];
    let length = Math.min(data.essay.length, data.serial.length, data.question.length);
    for (let i = 0; i < length; i++) {
      newDataList.push([data.essay[i], data.serial[i], data.question[i]]);
    }
    return newDataList;//二维数组
  }

  fetchData() {
    this.setState({//加载
      loadingStatus: LoadingManagerView.Loading
    });
    getLatestArticleList().then(articleList => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithPages(this.refactorArray(articleList)),
        loadingStatus: LoadingManagerView.LoadingSuccess
      });
    }).catch(() => {
      this.setState({//加载
        loadingStatus: LoadingManagerView.LoadingError
      });
    });
  }

  render() {
    const {loadingStatus, dataSource} = this.state;
    if (loadingStatus === LoadingManagerView.LoadingSuccess) {
      return (
        <ViewPager
          dataSource={dataSource}
          renderPage={this.renderPage}
          renderPageIndicator={false}
          onBeyondRange={this.onBeyondRange}/>
      );
    }
    return (
      <LoadingManagerView status={loadingStatus} onFetchData={this.fetchData}/>
    );
  }

  renderPage(articleList) {
    return (
      <ReadingArticleList articleList={articleList} hideNav={true}/>
    );
  }

  onBeyondRange(num) {
    if (num < 0) {
      Toast.show('右拉刷新界面');
    } else {
      Toast.show('左滑进入往期列表');
      getNavigator().push({name: 'ReadingBeforeMonthList'});
    }
  }

}

export default ReadingBottomViewPager;