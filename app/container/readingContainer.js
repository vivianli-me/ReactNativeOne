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
import Toast from '../util/toast';
import ReadingTopViewPager from '../component/readingTopViewPager';
import {getNavigator} from '../route';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

class ReadingContainer extends BaseComponent {

  constructor(props) {
    super(props);
  }

  getNavigationBarProps() {
    return {
      leftButtonImage: require('../image/search_min.png'),
      rightButtonImage: require('../image/individual_center.png')
    };
  }

/*<View style={{width: windowWidth, height: 150}}>
<ReadingTopViewPager/>
</View>*/

  renderBody() {
    return (
      <View style={styles.container}>
        <ReadingTopViewPager/>
      </View>
    );
  }

  onLeftPressed() {
    Toast.show('搜索');
  }
}



export default ReadingContainer;