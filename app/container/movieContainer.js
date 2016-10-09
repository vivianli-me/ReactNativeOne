/**
 * Created by lipeiwei on 16/10/2.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ListView
} from 'react-native';
import BaseComponent from '../base/baseComponent';
import GiftedListView from '../widget/giftedListView';
import {getMovieList} from '../api/movie';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  itemContainer: {

  },
  image: {
    width: windowWidth,
    height: 150,
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  bottomText: {
    color: 'red',
    fontSize: 20
  },
  separatorView: {
    height: 10,
    backgroundColor: 'white',
    width: windowWidth,
    alignItems: 'center'
  }
});

class MovieContainer extends BaseComponent {

  constructor(props) {
    super(props);
    this.lastOneId = 0;
    this.state = {
      refreshing: false,
      hasMore: true,
      movieList: []
    };
    this.fetchLatestData = this.fetchLatestData.bind(this);
    this.fetchMoreData = this.fetchMoreData.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  getNavigationBarProps() {
    return {
      leftButtonImage: require('../image/search_min.png'),
      rightButtonImage: require('../image/individual_center.png'),
      title: '电影'
    };
  }

  //该接口传0代表加载最新的
  fetchLatestData() {
    this.setState({
      refreshing: true
    });
    this.fetchData(0).then(movieList => {
      this.setState({
        movieList,
        hasMore: movieList.length != 0,
        refreshing: false
      });
    });
  }

  //加载更多
  fetchMoreData() {
    this.fetchData(this.lastOneId).then(newMovieList => {
      movieList = this.state.movieList.concat(newMovieList);//为什么不能用push
      this.setState({
        movieList,
        hasMore: newMovieList.length != 0
      });
    });
  }

  fetchData(id) {
    return getMovieList(id).then(movieList => {
      if (movieList && movieList.length > 0) {
        this.lastOneId = movieList[movieList.length - 1].id;//记录下来
      } else {
        this.lastOneId = -1;
      }
      return movieList;
    });
  }

  renderRow(movieData, sectionID, rowID) {
    return (
      <View  key={rowID}>
        <Image style={styles.image} resizeMode="cover" source={{uri: movieData.cover}}/>
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>{movieData.score}</Text>
          <Text style={[styles.bottomText, {marginTop: 0}]}>_________</Text>
        </View>
      </View>
    );
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View key={rowID} style={styles.separatorView}/>
    );
  }

  renderBody() {
    //pageSize代表一个event loop绘制多少个row
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.movieList);
    return (
      <GiftedListView
        initialListSize={20}
        pageSize={20}
        refreshing={this.state.refreshing}
        hasMore={this.state.hasMore}
        fetchLatestData={this.fetchLatestData}
        fetchMoreData={this.fetchMoreData}
        dataSource={dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
      />
    );
  }
}

export default MovieContainer;

const movieData = {
  "id": "97",
  "title": "惊天大逆转",
  "verse": "",
  "verse_en": "",
  "score": "76",
  "revisedscore": "0",
  "releasetime": "2016-07-15 00:00:00",
  "scoretime": "2016-07-16 00:00:00",
  "cover": "http://image.wufazhuce.com/FiOZo99ewwotKWQbng8Hu-eA4Fec",
  "servertime": 1475936097
};