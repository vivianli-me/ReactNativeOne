/**
 * Created by lipeiwei on 16/10/5.
 */

import React, {PropsType, Component} from 'react';
import {
  StyleSheet
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import {getLatestArticleList} from '../api/reading';
import ReadingArticleList from './readingArticleList'
import Toast from '../util/toast';
import {getNavigator} from '../route';

const styles = StyleSheet.create({

});

class ReadingBottomViewPager extends Component {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      dataSource: new ViewPager.DataSource({
        pageHasChanged: (p1, p2) => p1 !== p2,
      })
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  refactorArray(data) {
    let newDataList = [];
    let length = Math.min(data.essay.length, data.serial.length, data.question.length);
    for (let i = 0; i < length; i++) {
      newDataList.push([data.essay[i], data.serial[i], data.question[i]]);
    }
    return newDataList;
  }

  fetchData() {
    getLatestArticleList().then(articleList => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithPages(this.refactorArray(articleList))
      });
    });
  }

  render() {
    return (
      <ViewPager
        dataSource={this.state.dataSource}
        renderPage={this.renderPage}
        renderPageIndicator={false}
        onBeyondRange={this.onBeyondRange}/>
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