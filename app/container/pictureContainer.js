/**
 * Created by lipeiwei on 16/10/2.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BaseComponent from '../base/baseComponent';
import Toast from '../util/toast';
import PicturePage from '../component/picturePage';
import {getPictureList} from '../api/picture';
import ViewPager from 'react-native-viewpager';
import {getNavigator} from '../route';
import appearTime from '../constant/appearTime';

const styles = StyleSheet.create({

});

class PictureContainer extends BaseComponent {

  constructor(props) {
    super(props);
    this.renderViewPagerItem = this.renderViewPagerItem.bind(this);
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
      title: 'ONE'
    };
  }

  componentDidMount() {
    var date = new Date();
    getPictureList(date.getFullYear(), date.getMonth()).then(dataList => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithPages(dataList)
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
        renderPage={this.renderViewPagerItem}
        renderPageIndicator={false}/>
    );
  }

  onBeyondRange(num) {
    if (num < 0) {
      Toast.show('右拉刷新界面');
    } else {
      Toast.show('左滑进入往期列表');
      getNavigator().push({
        name: 'BeforeMonthList',
        ...(appearTime.picture),
        onPress: this.onPress
      });
      
    }
  }

  onPress(rowData) {
    // rowData[0] year
    // rowData[1] month 0~11
    //跳转到新的页面
    getNavigator().push({
      name: 'BeforePictureList',
      year: rowData[0],
      month: rowData[1]
    });
  }

  /**
   *
   * @param data
   * @param pageID string类型
   * @returns {XML}
   */
  renderViewPagerItem(data, pageID) {
    return (
      <PicturePage data={data} hideNav={true}/>
    );
  }

  onBackPressed() {//按下后退键

  }

  onLeftPressed() {
    Toast.show('搜索');
  }

  onRightPressed() {
    console.log('onRightPressed');
    Toast.show('个人中心');
  }
}

export default PictureContainer;