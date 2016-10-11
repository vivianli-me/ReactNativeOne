/**
 * Created by lipeiwei on 16/10/2.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import BaseComponent from '../base/baseComponent';
import MusicDetailPage from '../component/musicDetailPage';
import {getMusicIdList} from '../api/music';
import ViewPager from 'react-native-viewpager';
import Toast from '../util/toast';
import {getNavigator} from '../route';
import appearTime from '../constant/appearTime';

const styles = StyleSheet.create({

});

class MusicContainer extends BaseComponent {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.onBeyondRange = this.onBeyondRange.bind(this);
    this.state = {
      dataSource: new ViewPager.DataSource({
        pageHasChanged: (p1, p2) => p1 !== p2,
      })
    };
  }

  getNavigationBarProps() {
    return {
      leftButtonImage: require('../image/search_min.png'),
      rightButtonImage: require('../image/individual_center.png'),
      title: '音乐'
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    getMusicIdList().then(idList => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithPages(idList)
      });
    });
  }

  renderBody() {
    if (this.state.dataSource.getPageCount() == 0) {
      return null;
    }
    return (
      <ViewPager
        style={{flex: 1}}
        onBeyondRange={this.onBeyondRange}
        dataSource={this.state.dataSource}
        renderPage={this.renderPage}
        renderPageIndicator={false}/>
    );
  }

  renderPage(id) {
    id = parseInt(id);
    return (
      <MusicDetailPage id={id} hideNav={true}/>
    );
  }

  onBeyondRange(num) {
    if (num < 0) {
      Toast.show('右拉刷新界面');
    } else {
      Toast.show('左滑进入往期列表');
      getNavigator().push({
        name: 'BeforeMonthList',
        ...(appearTime.music),
        onPress: this.onPress
      });
    }
  }

  onPress(rowData) {
    // rowData[0] year
    // rowData[1] month 0~11
    //跳转到新的页面
    getNavigator().push({
      name: 'MusicListPage',
      year: rowData[0],
      month: rowData[1]
    });
  }
}



export default MusicContainer;