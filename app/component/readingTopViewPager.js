/**
 * Created by lipeiwei on 16/10/5.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import {getReadingImageList} from '../api/reading';
import {getNavigator} from '../route';
import Toast from '../util/toast';

const windowWidth = Dimensions.get('window').width;
const height = 150;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: height
  },
  image: {
    width: windowWidth,
    height: height
  }
});

class ReadingTopViewPager extends Component {

  constructor(props) {
    super();
    this.fetchData = this.fetchData.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.state = {
      dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2})
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    getReadingImageList().then(dataList => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithPages(dataList)
      });
    });
  }

  render() {
    //TODO 弄清楚这里的ViewPager用一层View包住的原因
    return (
      <View>
        <ViewPager
          style={styles.container}
          dataSource={this.state.dataSource}
          renderPage={this.renderPage}
          isLoop={true}
          autoPlay={true}
          />
      </View>
    );
  }

  renderPage(data) {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => this.onPress(data)}>
        <Image resizeMode="cover" style={styles.image} source={{uri: data.cover}}/>
      </TouchableOpacity>

    );
  }

  onPress(data) {
    getNavigator().push({
      name: 'ReadingCarouselDetail',
      data,
      navBarStyle: {
        navigationBar: {
          backgroundColor: data.bgcolor,
          borderBottomWidth: 0
        },
        navigationBarTitle: {
          color: 'white'
        }
      }
    });
  }

}

export default ReadingTopViewPager;