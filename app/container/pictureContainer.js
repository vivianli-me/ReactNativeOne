/**
 * Created by lipeiwei on 16/10/2.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  InteractionManager
} from 'react-native';
import BaseComponent from '../base/baseComponent';
import Toast from '../util/toast';
import PicturePage from '../component/picturePage';
import {getLatestPictureIdList} from '../api/picture';
import ViewPager from 'react-native-viewpager';
import {getNavigator} from '../route';
import appearTime from '../constant/appearTime';
import LoadingManagerView from '../component/loadingManagerView';

const styles = StyleSheet.create({

});

class PictureContainer extends BaseComponent {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.onBeyondRange = this.onBeyondRange.bind(this);
    this.state = {
      dataSource: new ViewPager.DataSource({
        pageHasChanged: (p1, p2) => p1 !== p2,
      }),
      loadingStatus: LoadingManagerView.Loading
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
    InteractionManager.runAfterInteractions(this.fetchData);
  }

  fetchData() {
    this.setState({//加载
      loadingStatus: LoadingManagerView.Loading
    });
    getLatestPictureIdList().then(idList => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithPages(idList),
        loadingStatus: LoadingManagerView.LoadingSuccess
      });
    }).catch(() => {
      this.setState({//加载
        loadingStatus: LoadingManagerView.LoadingError
      });
    });
  }

  renderBody() {
    const {loadingStatus, dataSource} = this.state;
    if (loadingStatus === LoadingManagerView.LoadingSuccess) {
      return (
        <ViewPager
          style={{flex: 1}}
          onBeyondRange={this.onBeyondRange}
          dataSource={dataSource}
          renderPage={this.renderPage}
          renderPageIndicator={false}/>
      );
    }
    return (
      <LoadingManagerView status={loadingStatus} onFetchData={this.fetchData}/>
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
  renderPage(id, pageID) {
    return (
      <PicturePage key={id} id={parseInt(id)} hideNav={true}/>
    );
  }

  onLeftPressed() {

  }

  onRightPressed() {
    getNavigator().push({
      name: 'MyGithubPage'
    });
  }
}

export default PictureContainer;