/**
 * Created by lipeiwei on 16/10/4.
 */


import React, {PropTypes} from 'react';
import {
  View,
  ListView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import BaseComponent from '../base/baseComponent';
import {getPictureList} from '../api/picture';
import {parseDate} from '../util/dateUtil';
import monthArray from '../constant/month';
import {getNavigator} from '../route';
import commonStyle from '../style/commonStyle';

const itemsPerRow = 2;
const horizontalMargin = 10;
const windowWidth = Dimensions.get('window').width;

const singleItemWidth = (windowWidth - (itemsPerRow + 1) * horizontalMargin) / itemsPerRow;
const styles = StyleSheet.create({
  listView: {
    flex: 1,
    padding: horizontalMargin
  },
  itemContainer: {
    width: singleItemWidth,
    borderWidth: 1,
    borderColor: commonStyle.GRAY_COLOR,
    alignItems: 'center'
  },
  image: {
    width: singleItemWidth,
    height: 150
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#00000033',//#rrggbbaa
    justifyContent: 'space-between'//space-between两边无间隔 space-around两边有间隔
  },
  rowText: {
    fontSize: 12,
    color: 'white'
  },
  contentText: {
    marginVertical: 5,
    textAlign: 'left'
  },
  separatorLine: {
    height: 10
  }
});

class BeforePictureList extends BaseComponent {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderSingleItem = this.renderSingleItem.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  getNavigationBarProps() {
    return {
      hideRightButton: true,
      title: `${monthArray[this.props.month]}.${this.props.year}`,
      leftButtonImage: require('../image/return.png')
    };
  }

  refactorData(dataList) {
    let newDataList = [];
    let tempArray = [];
    let length = dataList.length;
    for(let i = 0; i < length; i++) {
      tempArray.push(dataList[i]);
      if (tempArray.length === itemsPerRow) {
        newDataList.push(tempArray);
        tempArray = [];
      }
    }
    //解决length/itemsPerRow不整除的情况
    if (tempArray.length > 0) {
      newDataList.push(tempArray);
    }
    return newDataList;
  }

  componentDidMount() {
    let dateStr = `${this.props.year}-${this.props.month + 1}`;
    getPictureList(dateStr).then(dataList => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.refactorData(dataList))
      });
    });
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
    return (
      <View key={rowID} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {
          rowData.map(itemData => {
            return this.renderSingleItem(itemData);
          })
        }
      </View>
    );
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View key={rowID} style={styles.separatorLine}/>
    );
  }

  renderSingleItem(data) {
    let date = parseDate(data.hp_makettime);
    let dateStr = `${date.getDate()} ${monthArray[date.getMonth()]}.${date.getFullYear()}`;
    return (
      <TouchableOpacity key={data.hpcontent_id} onPress={() => this.onPress(data)}>
        <View style={styles.itemContainer}>
          <View>
            <Image style={styles.image} source={{uri: data.hp_img_url}}/>
            <View style={styles.rowContainer}>
              <Text style={styles.rowText}>{data.hp_title}</Text>
              <Text style={styles.rowText}>{dateStr}</Text>
            </View>
          </View>
          <Text numberOfLines={2} style={styles.contentText}>{data.hp_content}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  onPress(data) {
    //跳转
    getNavigator().push({
      name: 'PicturePage',
      data,
      hideNav: false
    });
  }
  
}

BeforePictureList.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,//0~11
};

export default BeforePictureList;
