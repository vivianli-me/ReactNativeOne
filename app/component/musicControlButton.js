/**
 * Created by lipeiwei on 16/10/15.
 */


import React from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeMusicControlModalVisibility} from '../actions/media';

const defaultNavigationHeight = 50;

const styles = StyleSheet.create({
  container: {
    height: defaultNavigationHeight,
    justifyContent: 'center',
    paddingHorizontal: 5
  },
  image: {
    height: 25,
    width: 30
  }
});

class MusicControlButton extends React.Component {

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <Image style={styles.image} resizeMode="contain" source={require('../image/disc_pause.png')}/>
      </TouchableOpacity>
    );
  }

  onPress() {
    this.props.changeMusicControlModalVisibility(true);
  }

}

const mapStateToProps = state => {
  let media = state.media;
  let visible = false;
  if (media.mediaList && media.mediaList.length > 0) {
    visible = true;
  }
  return {
    visible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeMusicControlModalVisibility: bindActionCreators(changeMusicControlModalVisibility, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicControlButton);