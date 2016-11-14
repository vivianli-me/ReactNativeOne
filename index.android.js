

import React from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 18}}>该项目因私自获取ONE的接口数据, 所以不再维护</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('ReactNativeOne', () => App);