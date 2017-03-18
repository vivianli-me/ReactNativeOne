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
  ListView,
  TouchableOpacity
} from 'react-native';
import BaseComponent from '../base/baseComponent';
import GiftedListView from '../widget/giftedListView';
import {getMovieList} from '../api/movie';
import {getNavigator} from '../route';
import MovieListItem from '../component/movieListItem'

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  itemContainer: {

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
    this.renderRow = this.renderRow.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.fetchMoreData = this.fetchMoreData.bind(this);
    this.fetchLatestData = this.fetchLatestData.bind(this);
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
      let movieList = this.state.movieList.concat(newMovieList);//push只能传元素.concat才能传数组
      this.setState({
        movieList,
        hasMore: newMovieList.length != 0
      });
    });
  }

  fetchData(id) {
    return getMovieList(id).then(movieList => movieList.filter(movie => !!movie.cover)).then(movieList => {
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
      <MovieListItem rowID={rowID} cover={movieData.cover} score={movieData.score} onPress={() => this.onPress(movieData)}/>
    );
  }

  onPress(movieData) {
    getNavigator().push({
      name: 'MovieDetailPage',
      simpleMovieData: movieData
    });
  }

  renderSeparator(sectionID, rowID) {
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

  onRightPressed() {
    getNavigator().push({
      name: 'MyGithubPage'
    });
  }
}

export default MovieContainer;
