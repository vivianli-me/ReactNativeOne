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
    width: 50,
    height: 50
  }
});

class LoadingErrorView extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1} style={[styles.container, this.props.containerStyle]} onPress={this.props.onPress}>
        <View style={[styles.container, this.props.containerStyle]}>
          <Image style={styles.image} resizeMode="contain" source={require('../image/loading_error_image.png')}/>
          <Text style={styles.text}>加载失败, 请点击重试</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

LoadingErrorView.propTypes = {
  onPress: PropTypes.func,
  containerStyle: PropTypes.object
};

export default LoadingErrorView;