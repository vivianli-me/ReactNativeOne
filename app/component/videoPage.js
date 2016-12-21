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
  ActivityIndicator,
  Image,
  Slider
} from 'react-native';
import Video from 'react-native-video';
import Orientation from '../util/orientation';
import {getNavigator} from '../route';
import {connect} from 'react-redux';
import {stopPlayMedia} from '../actions/media';
import {bindActionCreators} from 'redux';

const defaultNavigationHeight = 50;
const defaultButtonHeight = defaultNavigationHeight - 25;//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-between'
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  video: {
    flex: 1
  },
  navigationBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: defaultNavigationHeight,
    backgroundColor: '#00000088'
  },
  navigationBarText: {
    color: 'white',
    fontSize: 18
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    height: defaultNavigationHeight
  },
  bottomProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  bottomText: {
    color: 'white',
    fontSize: 16
  },
});

class VideoPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: true,//是否全屏
      isLoading: true,//是否正在加载
      rate: 1,//播放速率
      muted: false,//是否静音
      paused: false,
      resizeMode: 'contain',
      duration: 0.0,//总时长 单位秒
      currentTime: 0.0,//当前播放位置 单位秒
    };
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.renderActivityIndicator = this.renderActivityIndicator.bind(this);
    this.renderNavigationBar = this.renderNavigationBar.bind(this);
    this.renderBottomControlView = this.renderBottomControlView.bind(this);
    this.changeVideoFullScreen = this.changeVideoFullScreen.bind(this);
    props.isPlayingMedia && props.stopPlayMedia();//暂停播放音乐
  }

  componentDidMount() {
    //横屏
    Orientation.lockToLandscape();
  }

  componentWillUnmount() {
    //竖屏
    Orientation.lockToPortrait();
    /*if (this.timeOutId) {
      clearTimeout(this.timeOutId);
    }*/
  }

  onLoadStart() {
    this.setState({isLoading: true});
  }

  onLoad(data) {
    this.setState({
      isLoading: false,
      duration: data.duration
    });
  }

  onProgress(data) {
    this.setState({
      currentTime: data.currentTime
    });
  }

  onEnd() {
    this.setState({
      paused: true
    });
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
        <TouchableOpacity style={styles.videoContainer} activeOpacity={1} onPress={() => this.changeVideoFullScreen(!this.state.isFullScreen)}>
          <Video
            ref={component => this.videoRef = component}
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
            repeat={false}/>
        </TouchableOpacity>
        {this.renderNavigationBar()}
        {this.renderBottomControlView()}
        {this.renderActivityIndicator()}
      </View>
    );
  }

  renderNavigationBar() {
    if (this.state.isFullScreen) {
      return null;
    }
    const {movieName} = this.props;
    return (
      <View style={styles.navigationBarContainer}>
        <TouchableOpacity style={styles.leftButton} onPress={getNavigator().pop}>
          <Image style={{height: defaultButtonHeight}} source={require('../image/return.png')} resizeMode="contain"/>
        </TouchableOpacity>
        <Text style={styles.navigationBarText}>{movieName}</Text>
      </View>
    );
  }

  renderBottomControlView() {
    if (this.state.isFullScreen) {
      return null;
    }
    const {duration, currentTime, paused} = this.state;
    return (
      <View style={{backgroundColor: '#00000088', paddingTop: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {this.renderTouchableOpacityImage(require('../image/movie_review_previous.png'), () => {this.seekTo(this.state.currentTime - 5)})}
          {
            paused ?
            this.renderTouchableOpacityImage(require('../image/movie_review_play.png'), () => this.setState({
              paused: false
            })) :
            this.renderTouchableOpacityImage(require('../image/movie_review_pause.png'), () => this.setState({
              paused: true
            }))
          }
          {this.renderTouchableOpacityImage(require('../image/movie_review_next.png'), () => {this.seekTo(this.state.currentTime + 5)})}
        </View>
        <View style={styles.bottomProgressContainer}>
          <Text style={styles.bottomText}>{this.getTimeStr(currentTime)}</Text>
          {/*如何改变进度条颜色*/}
          <Slider
            value={currentTime}
            step={1}
            minimumValue={0}
            maximumValue={duration}
            onSlidingComplete={currentTime => this.seekTo(currentTime)}
            style={{flex: 1, marginHorizontal: 10}}/>
          <Text style={styles.bottomText}>{this.getTimeStr(duration)}</Text>
        </View>
      </View>
    );
  }

  renderTouchableOpacityImage(imageSource, onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Image style={{height: 40}} source={imageSource} resizeMode="contain"/>
      </TouchableOpacity>
    );
  }

  getTimeStr(timeInSecond) {
    let minute = Math.round(timeInSecond / 60) + '';
    let second = Math.round(timeInSecond % 60) + '';
    //补全两位
    let complete = str => str.length >= 2 ? str : str.length >= 1 ? `0${str}` : '00';
    return `${complete(minute)}:${complete(second)}`
  }

  seekTo(currentTime) {
    this.videoRef.seek(currentTime);
    this.setState({
      currentTime: currentTime ,
      paused: false
    });
  }

  changeVideoFullScreen(isFullScreen) {
    /*if (this.timeOutId) {
      clearTimeout(this.timeOutId);
      this.timeOutId = undefined;
    }
    this.setState({
      isFullScreen
    });
    if (!isFullScreen) {
      //两秒后自动隐藏
      this.timeOutId = setTimeout(() => {
        this.setState({
          isFullScreen: true
        });
      } ,2000);
    }*/
    this.setState({
      isFullScreen
    });
  }

}

VideoPage.propTypes = {
  uri: PropTypes.string.isRequired,
  movieName: PropTypes.string.isRequired,
  isPlayingMedia: PropTypes.bool.isRequired,
  stopPlayMedia: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isPlayingMedia: state.media.isPlayingMedia
  };
};

const mapDispatchToProps = dispatch => {
  return {
    stopPlayMedia: bindActionCreators(stopPlayMedia, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);