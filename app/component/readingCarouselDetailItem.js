/**
 * Created by lipeiwei on 16/10/5.
 */


import React, {PropTypes} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  touchableOpacity: {
    marginHorizontal: 40,
    marginTop: 40
  },
  rowContainer: {
    flexDirection: 'row',
  },
  columnContainer: {
    marginLeft: 5,
    width: windowWidth - 2 * 40//Text组件跟它的父组件如果都没有指定宽度, 那Text将会向右一直蔓延开去, 不会换行
  },
  titleText: {
    fontSize: 18,
    color: 'white',
  },
  authorText: {
    fontSize: 14,
    color: 'white',
    marginTop: 5
  },
  introductionText: {
    fontSize: 14,
    color: 'white',
    marginTop: 8,
  }
});

class ReadingCarouselDetailItem extends React.Component {
  render() {
    const {rowID, onPress} = this.props;
    const {title, author, introduction} = this.props.detailData;
    return (
      <TouchableOpacity style={styles.touchableOpacity} onPress={onPress} activeOpacity={1}>
        <View style={styles.rowContainer}>
          <Text style={styles.titleText}>{rowID + 1}</Text>
          <View style={styles.columnContainer}>
            <Text numberOfLines={2} style={styles.titleText}>{title}</Text>
            <Text style={styles.authorText}>{author}</Text>
            <Text numberOfLines={2} style={styles.introductionText}>{introduction}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

ReadingCarouselDetailItem.propTypes = {
  detailData: PropTypes.object.isRequired,
  rowID: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired
};

export default ReadingCarouselDetailItem;

