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
import Toast from '../util/toast';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class PictureContainer extends BaseComponent {

  getNavigationBarProps() {
    return {
      leftButtonImage: require('../image/search_min.png'),
      rightButtonImage: require('../image/individual_center.png')
    };
  }

  renderBody() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          I'm picture container
        </Text>
        <Text style={styles.welcome}>
          under construction ( 该页面正在施工 )
        </Text>
      </View>
    );
  }

  onBackPressed() {//按下后退键

  }

  onLeftPressed() {
    console.log('onLeftPressed');
    Toast.show('搜索');
  }

  onRightPressed() {
    console.log('onRightPressed');
    Toast.show('个人中心');
  }
}

export default PictureContainer;