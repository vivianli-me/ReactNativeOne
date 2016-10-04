/**
 * Created by lipeiwei on 16/10/4.
 * 往期列表, 使用ListView展示从2012年十月到当前月份的列表
 */

import React from 'react';
import {
  ListView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import monthArray from '../constant/month';
import BaseComponent from '../base/baseComponent';
import {getNavigator} from '../route';
import commonStyle from '../style/commonStyle';

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    backgroundColor: 'white'
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15
  },
  itemText: {
    color: commonStyle.TEXT_GRAY_COLOR,
    fontSize: 18
  },
  itemImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  separatorLine: {
    height: 1,
    backgroundColor: commonStyle.GRAY_COLOR,
    marginHorizontal: 15
  }
});

let dateList = [];
let date = new Date();
let currentMonth = date.getMonth();//当前月份
let currentYear = date.getFullYear();//当前年份
let endMonth = 9;
let endYear = 2012;
for (let year = currentYear, month = currentMonth; (year > endYear || month > endMonth - 1);) {

  console.log(`${year}年${month + 1}月`);
  dateList.push([year, month]);

  if (month === 0) {
    month = 11;
    year = year - 1;
  } else {
    month = month - 1;
  }
}


class BeforeMonthList extends BaseComponent {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.onPress = this.onPress.bind(this);
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: dataSource.cloneWithRows(dateList)
    }
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
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}/>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    var dateStr = rowID == 0 ? '本月' : `${monthArray[rowData[1]]}.${rowData[0]}` ;
    return (
      <TouchableOpacity key={rowID} onPress={() => this.onPress(rowData)}>
        <View style={styles.itemView}>
          <Text style={styles.itemText}>{dateStr}</Text>
          <Image style={styles.itemImage} source={require('../image/forward.png')}/>
        </View>
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View key={rowID} style={styles.separatorLine}/>
    );
  }

  onPress(rowData) {
    // rowData[0] year
    // rowData[1] month 0~11
    //跳转到新的页面
  }

  onLeftPressed() {
    getNavigator().pop();
  }

}

export default BeforeMonthList;
