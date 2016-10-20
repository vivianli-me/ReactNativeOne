/**
 * Created by lipeiwei on 16/9/30.
 */


import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import NavigationBar from '../component/navigationBar';
import {getNavigator} from '../route';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

class BaseComponent extends Component {

  constructor(props) {
    super(props);
    this.getNavigationBarProps = this.getNavigationBarProps.bind(this);
    this.renderNavigationBar = this.renderNavigationBar.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.onLeftPressed = this.onLeftPressed.bind(this);
    this.onRightPressed = this.onRightPressed.bind(this);
  }

  /**
   * 子类可重写
   * @returns {null}
   */
  getNavigationBarProps() {
    return null;
  }

  renderNavigationBar() {
    let navigationBarProps = this.getNavigationBarProps();
    Object.assign(navigationBarProps, this.props);
    return (
      <NavigationBar
        navigationBarProps={navigationBarProps}
        onLeftPressed={this.onLeftPressed}
        onRightPressed={this.onRightPressed}
      />
    );
  }

  renderBody() {

  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.renderNavigationBar()}
        {this.renderBody()}
      </View>
    );
  }

  componentWillUnmount() {

  }

  onLeftPressed() {
    getNavigator().pop();
  }

  onRightPressed() {
    console.log('onRightPressed');
  }
}

export default BaseComponent;