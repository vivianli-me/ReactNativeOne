/**
 * Created by lipeiwei on 16/10/2.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import BaseComponent from '../base/baseComponent';
import ReadingTopViewPager from '../component/readingTopViewPager';
import ReadingBottomViewPager from '../component/readingBottomViewPager'
import {getNavigator} from '../route';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class ReadingContainer extends BaseComponent {

  constructor(props) {
    super(props);
  }

  getNavigationBarProps() {
    return {
      leftButtonImage: require('../image/search_min.png'),
      rightButtonImage: require('../image/individual_center.png'),
      title: '阅读'
    };
  }

  renderBody() {
    return (
      <View style={styles.container}>
        <ReadingTopViewPager/>
        <ReadingBottomViewPager/>
      </View>
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



export default ReadingContainer;