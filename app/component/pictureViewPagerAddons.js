/**
 * Created by lipeiwei on 16/10/3.
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import commonStyle from '../style/commonStyle';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  leftContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    marginRight: windowWidth,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  Text: {
    color: commonStyle.TEXT_GRAY_COLOR,
    fontSize: 14
  },
});
export const leftAddon = () => {
  return (
    <View style={styles.leftContainer}>
      <Text style={styles.text}>右拉刷新界面</Text>
    </View>
  );
};

export const rightAddon = () => {
  return (
    <View style={styles.rightContainer}>
      <Text style={styles.text}>左滑进入往期列表</Text>
    </View>
  );
};