/**
 * Created by lipeiwei on 16/10/2.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class MovieContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          I'm movie container
        </Text>
        <Text style={styles.welcome}>
          under construction ( 该页面正在施工 )
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default MovieContainer;