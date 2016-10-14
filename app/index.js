/**
 * Created by lipeiwei on 16/9/30.
 */

import React from 'react';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
  StatusBar,
  BackAndroid,
  Platform
} from 'react-native';
import {getRouteMap, registerNavigator} from './route';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';
import * as MediaActions from './actions/media';


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigator: {
    flex: 1,
    backgroundColor: 'white'
  },
  errorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  errorText: {
    color: 'red',
    fontSize: 16
  }

});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
    this.onBackAndroid = this.onBackAndroid.bind(this);
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
        />
        <Navigator
          style={styles.navigator}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid}
          renderScene={this.renderScene}
          initialRoute={{
            name: 'MainContainer',//MainContainer
          }}/>
      </View>
    );
  }

  renderScene(route, navigator) {
    this.navigator = navigator;
    registerNavigator(navigator);
    //Each component name should start with an uppercase letter
    //jsx中的组件都得是大写字母开头, 否则将报错, expected a component class, got [object Object]
    let Component = getRouteMap().get(route.name);
    if (!Component) {
      return (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>您所启动的Component未在routeMap中注册</Text>
        </View>
      );
    }
    return (
      <Component {...route}/>
    );
  }

  onBackAndroid() {
    const routers = this.navigator.getCurrentRoutes();
    if (routers.length > 1) {
      this.navigator.pop();
      return true;
    }
    BackAndroid.exitApp();
    return false;
  }
}

export default function globalInit() {
  var loggerMiddleware = createLogger();
  var store = applyMiddleware(thunk, loggerMiddleware)(createStore)(reducers);


  //just for test
  //test begin
  // setTimeout(() => {
  //   store.dispatch(MediaActions.startPlayMedia())
  // }, 1000);
  //
  // setTimeout(() => {
  //   store.dispatch(MediaActions.turnToNextOne())
  // }, 30000);
  //
  // setTimeout(() => {
  //   store.dispatch(MediaActions.stopPlayMedia())
  // }, 70000);

  // setTimeout(() => {
  //   store.dispatch(MediaActions.startPlayMedia())
  // }, 9000);
  //
  // setTimeout(() => {
  //   store.dispatch(MediaActions.turnToPreviousOne())
  // }, 13000);
  //
  // setTimeout(() => {
  //   store.dispatch(MediaActions.stopPlayMedia())
  // }, 15000);
  //test end

  return () => {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  };
};





