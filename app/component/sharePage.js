/**
 * Created by lipeiwei on 16/10/17.
 */

import React, {PropTypes} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Clipboard
} from 'react-native';
import commonStyle from '../style/commonStyle';
import {getNavigator} from '../route';
import * as Wechat from 'react-native-wechat';
import Toast from '../util/toast';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  touchableOpacityContainer: {
    margin: 15,
    flex: 1
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  text: {
    fontSize: 16,
    color: commonStyle.TEXT_GRAY_COLOR
  },
  image: {
    width: windowWidth - 30,
    height: 50
  },
  splitView: {
    height: 1,
    width: windowWidth - 30,
    backgroundColor: commonStyle.GRAY_COLOR,
    marginTop: 10
  }
});

class SharePage extends React.Component {

  constructor() {
    super();
    this.shareToSession = this.shareToSession.bind(this);
    this.shareToTimeline = this.shareToTimeline.bind(this);
    this.setToClipboard = this.setToClipboard.bind(this);
  }

  render() {
    return (
      <TouchableOpacity style={styles.touchableOpacityContainer} onPress={getNavigator().pop}>
        <View style={styles.container}>
          <Text style={styles.text}>分享 & 收藏</Text>
          <View style={styles.splitView}/>
          {this.renderTouchableOpacityImage(require('../image/wechat_fri.png'), this.shareToSession)}
          {this.renderTouchableOpacityImage(require('../image/wechat_moments.png'), this.shareToTimeline)}
          {this.renderTouchableOpacityImage(require('../image/copylink.png'), this.setToClipboard)}
        </View>
      </TouchableOpacity>
    );
  }

  renderTouchableOpacityImage(imageSource, onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={{paddingTop: 10}}>
        <Image style={styles.image} resizeMode="contain" source={imageSource} />
      </TouchableOpacity>
    );
  }

  shareToSession() {
    Wechat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          Wechat.shareToSession(this.props.shareData)
            .catch((error) => {
              Toast.show(error.message);
            });
        } else {
          Toast.show('没有安装微信软件，请您安装微信之后再试');
        }
      });
  }

  shareToTimeline() {
    Wechat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          Wechat.shareToTimeline(this.props.shareData)
            .catch((error) => {
              Toast.show(error.message);
            });
        } else {
          Toast.show('没有安装微信软件，请您安装微信之后再试');
        }
      });
  }

  setToClipboard() {
    Clipboard.setString(this.props.shareData.webpageUrl);
    Toast.show('已复制到剪贴板');
  }

}

SharePage.propTypes = {
  shareData: PropTypes.object.isRequired
};

export default SharePage;