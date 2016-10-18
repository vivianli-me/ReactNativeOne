/**
 * Created by lipeiwei on 16/10/18.
 */


import React, {PropTypes} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    marginTop: 10
  },
});

class LoadingView extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>加载中</Text>
      </View>
    );
  }
}

LoadingView.propTypes = {};

export default LoadingView;