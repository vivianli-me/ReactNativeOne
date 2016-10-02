/**
 * Created by lipeiwei on 16/10/2.
 */

import React, {Component} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import commonStyle from '../style/commonStyle';

const windowWidth = Dimensions.get('window').width;

const defaultNavigationHeight = 50;
const defaultButtonHeight = defaultNavigationHeight - 25;//左侧图片的高度


const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: commonStyle.MAIN_COLOR,
    height: defaultNavigationHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: commonStyle.GRAY_COLOR
  },
  navigationTitle: {
    color: commonStyle.TEXT_COLOR,
    fontSize: 22,
    textAlign: 'center',
    maxWidth: windowWidth - 40,
    fontWeight: 'bold'
  },
  leftButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 55,
    // backgroundColor: 'red',//test
    justifyContent: 'center',//主轴
    alignItems: 'center'//TODO why 这里如果设置flex-start时图片偏右, 设置flex-end时图片偏左, 原因不明
  },
  rightButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 55,
    // backgroundColor: 'red',//test
    justifyContent: 'center',//主轴
    alignItems: 'center'//

  },
  rightButtonTextStyle: {
    color: commonStyle.TEXT_GRAY_COLOR,
    textAlign: 'right',
    fontSize: 16,
    marginRight: 10
  }
});

const defaultNavigationBarProps = {
  hideNav: false,
  hideLeftButton: false,
  hideRightButton: false,
  title: 'ONE',
  // leftButtonImage:
  // rightButtonImage:
  // rightTitle: '点击'
};

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.navigationBarProps = Object.assign({}, defaultNavigationBarProps, props.navigationBarProps);
    this.renderLeftButton = this.renderLeftButton.bind(this);
    this.renderRightButton = this.renderRightButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.navigationBarProps = Object.assign({}, defaultNavigationBarProps, nextProps.navigationBarProps);
  }

  renderLeftButton() {
    if (this.navigationBarProps.hideLeftButton) {
      return null;
    }
    var {onLeftPressed} = this.props;
    return (
      <TouchableOpacity onPress={onLeftPressed} style={styles.leftButton}>
        <Image style={{height: defaultButtonHeight, resizeMode: 'contain'}} source={this.navigationBarProps.leftButtonImage}/>
      </TouchableOpacity>
    );
  }

  renderRightButton() {
    if (this.navigationBarProps.hideRightButton) {
      return null;
    }
    //优先image, text次之
    var {onRightPressed} = this.props;
    var component;
    if (this.navigationBarProps.rightButtonImage) {
      component = (
        <Image style={{height: defaultButtonHeight, resizeMode: 'contain'}} source={this.navigationBarProps.rightButtonImage}/>
      );
    }
    else if (this.navigationBarProps.rightTitle && this.navigationBarProps.rightTitle !== '') {
      component = (
        <Text style={styles.rightButtonTextStyle}>{this.navigationBarProps.rightTitle}</Text>
      );
    } else {
      return null;
    }

    return (
      <TouchableOpacity onPress={onRightPressed} style={styles.rightButton}>
        {component}
      </TouchableOpacity>
    );
  }

  render() {
    var {hideNav, title} = this.navigationBarProps;
    if (hideNav) {
      return null;
    }
    return (
      <View style={styles.navigationBar}>
        {this.renderLeftButton()}
        {this.renderRightButton()}
        <Text numberOfLines={1} style={styles.navigationTitle}>{title}</Text>
      </View>
    );
  }
}

export default NavigationBar;
