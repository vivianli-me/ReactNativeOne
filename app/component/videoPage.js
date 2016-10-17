/**
 * Created by lipeiwei on 16/10/17.
 * 电影预告片播放页
 */

import React, {PropTypes} from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import Video from 'react-native-video';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  video: {
    flex: 1
  }
});

class VideoPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,//是否正在加载
      rate: 1,//播放速率
      muted: false,//是否静音
      paused: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
    };
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.renderActivityIndicator = this.renderActivityIndicator.bind(this);
  }

  onLoadStart() {
    this.setState({isLoading: true});
  }

  onLoad() {
    this.setState({isLoading: false});
  }

  onProgress() {

  }

  onEnd() {

  }

  renderActivityIndicator() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator color='white'
           style={{position: 'absolute', top: 0, bottom: 0, left:0, right: 0}}/>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Video
          source={{uri: this.props.uri}}
          style={styles.video}
          rate={this.state.rate}
          paused={this.state.paused}
          volume={1}
          muted={this.state.muted}
          resizeMode={this.state.resizeMode}
          onLoadStart={this.onLoadStart}
          onLoad={this.onLoad}
          onProgress={this.onProgress}
          onEnd={this.onEnd}
          repeat={false}
          fullscreen={true}/>
        {this.renderActivityIndicator()}
      </View>
    );
  }

}

VideoPage.propTypes = {
  uri: PropTypes.string.isRequired
};

export default VideoPage;