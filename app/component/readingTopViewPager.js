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
  Image,
  InteractionManager
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import {getReadingImageList} from '../api/reading';
import {getNavigator} from '../route';
import LoadingManagerView from './loadingManagerView';

const windowWidth = Dimensions.get('window').width;
const HEIGHT = 150;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: HEIGHT
  },
  image: {
    width: windowWidth,
    height: HEIGHT
  }
});

class ReadingTopViewPager extends Component {

  constructor(props) {
    super();
    this.fetchData = this.fetchData.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.state = {
      dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}),
      loadingStatus: LoadingManagerView.Loading
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchData);
  }

  fetchData() {
    this.setState({//加载
      loadingStatus: LoadingManagerView.Loading
    });
    getReadingImageList().then(dataList => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithPages(dataList),
        loadingStatus: LoadingManagerView.LoadingSuccess
      });
    }).catch(() => {
      this.setState({//加载
        loadingStatus: LoadingManagerView.LoadingError
      });
    });
  }

  render() {
    const {loadingStatus, dataSource} = this.state;
    if (loadingStatus === LoadingManagerView.LoadingSuccess) {
      //TODO 弄清楚这里的ViewPager用一层View包住的原因
      return (
        <View>
          <ViewPager
            style={styles.container}
            dataSource={dataSource}
            renderPage={this.renderPage}
            isLoop={true}
            autoPlay={true}
          />
        </View>
      );
    }
    return (
      <LoadingManagerView containerStyle={{height: HEIGHT}} status={loadingStatus} onFetchData={this.fetchData}/>
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
      navigationBar: {
        backgroundColor: data.bgcolor,
        borderBottomWidth: 0
      },
      navigationBarTitle: {
        color: 'white'
      }
    });
  }

}

export default ReadingTopViewPager;