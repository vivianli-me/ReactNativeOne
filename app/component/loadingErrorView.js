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
  image: {
    width: 100,
    height: 100
  }
});

class LoadingErrorView extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <View style={styles.container}>
          <Image style={styles.image} resizeMode="contain" source={require('../image/loading_error_image.png')}/>
          <Text style={styles.text}>加载失败, 请点击重试</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

LoadingErrorView.propTypes = {
  onPress: PropTypes.func,
};

export default LoadingErrorView;