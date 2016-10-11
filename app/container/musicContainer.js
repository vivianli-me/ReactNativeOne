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

const styles = StyleSheet.create({

});

class MusicContainer extends BaseComponent {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      idList: []
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
      this.setState({idList});
    });
  }

  renderBody() {
    const {idList} = this.state;
    if (idList.length > 0) {
      return this.renderPage(idList[2]);
    }
    return null;
  }

  renderPage(id) {
    id = parseInt(id);
    return (
      <MusicDetailPage id={id}/>
    );
  }
}



export default MusicContainer;