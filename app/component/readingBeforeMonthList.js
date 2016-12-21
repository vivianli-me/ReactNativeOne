/**
 * Created by lipeiwei on 16/10/5.
 */


import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import BaseComponent from '../base/baseComponent';
import BeforeMonthList from './beforeMonthList';
import appearTime from '../constant/appearTime';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {getNavigator} from '../route';
import commonStyle from '../style/commonStyle';

const articleType = ['essay', 'serial', 'question'];
const articleTypeText = ['短篇', '连载', '问题'];

const styles = StyleSheet.create({
  topContainer: {
    height: 60,
    flexDirection: 'row'
  },
  touchableOpacity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
});

class ReadingBeforeMonthList extends BaseComponent {

  constructor(props) {
    super(props);
  }

  getNavigationBarProps() {
    return {
      hideRightButton: true,
      title: '往期列表',
      leftButtonImage: require('../image/return.png')
    };
  }

  renderBody() {
    return (
      <ScrollableTabView tabBarActiveTextColor={commonStyle.LIGHT_BLUE_COLOR} tabBarUnderlineStyle={{backgroundColor: commonStyle.LIGHT_BLUE_COLOR}}>
        <BeforeMonthList
          beginYear={appearTime.essay.beginYear}
          beginMonth={appearTime.essay.beginMonth}
          onPress={dateArray => this.onPress(dateArray, 0)}
          hideNav={true}
          tabLabel={articleTypeText[0]}/>
        <BeforeMonthList
          beginYear={appearTime.serial.beginYear}
          beginMonth={appearTime.serial.beginMonth}
          onPress={dateArray => this.onPress(dateArray, 1)}
          hideNav={true}
          tabLabel={articleTypeText[1]}/>
        <BeforeMonthList
          beginYear={appearTime.question.beginYear}
          beginMonth={appearTime.question.beginMonth}
          onPress={dateArray => this.onPress(dateArray, 2)}
          hideNav={true}
          tabLabel={articleTypeText[2]}/>
      </ScrollableTabView>
    );
  }

  onPress(dateArray, index) {
    getNavigator().push({
      name: 'ReadingArticleList',
      year: dateArray[0],
      month: dateArray[1],
      index
    });
  }
}

export default ReadingBeforeMonthList;