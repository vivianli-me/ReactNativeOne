/**
 * Created by lipeiwei on 16/10/4.
 */

import React, {PropTypes}from 'react';
import {
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
  Dimensions
} from 'react-native';
import {getNavigator} from '../route';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: windowHeight / 3 * 2,
    width: windowWidth
  }
});

class ImageViewer extends React.Component {

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  render() {
    return (
      <TouchableOpacity  style={styles.container} activeOpacity={1} onPress={this.onPress}>
        <Image style={styles.image} resizeMode="contain" source={this.props.source}/>
      </TouchableOpacity>
    );
  }

  onPress() {
    getNavigator().pop();
  }

}

ImageViewer.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
    }),
    // Opaque type returned by require('./image.jpg')
    PropTypes.number,
    // Multiple sources
    PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
      }))
  ]),
};

export default ImageViewer;