/**
 * Created by lipeiwei on 16/10/4.
 * 往期列表, 使用ListView展示从2012年十月到当前月份的列表
 */

import React, {PropTypes} from 'react';
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
import {getDateStrListBeforeNow} from '../util/dateUtil';

const styles = StyleSheet.create({
  listView: {
    flex: 1,
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
  },
  separatorLine: {
    height: 1,
    backgroundColor: commonStyle.GRAY_COLOR,
    marginHorizontal: 15
  }
});

class BeforeMonthList extends BaseComponent {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);

    let dateList = getDateStrListBeforeNow(this.props.beginYear, this.props.beginMonth);
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.beginYear != this.props.beginYear || nextProps.beginMonth != this.props.beginMonth) {
      let dateList = getDateStrListBeforeNow(nextProps.beginYear, nextProps.beginMonth);
      this.state = {
        dataSource: this.state.dataSource.cloneWithRows(dateList)
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState ) {
    /*if (nextState !== this.state) {
      return true;
    }
    if (nextProps.beginYear != this.props.beginYear || nextProps.beginMonth != this.props.beginMonth) {
      return true;
    }
    return false;*/
    return true;
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
      <TouchableOpacity key={rowID} onPress={() => this.props.onPress(rowData)}>
        <View style={styles.itemView}>
          <Text style={styles.itemText}>{dateStr}</Text>
          <Image style={styles.itemImage} resizeMode="contain" source={require('../image/forward.png')}/>
        </View>
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View key={rowID} style={styles.separatorLine}/>
    );
  }

}

BeforeMonthList.propTypes = {
  beginMonth: PropTypes.number.isRequired,
  beginYear: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default BeforeMonthList;
