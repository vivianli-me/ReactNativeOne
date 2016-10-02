/**
 * Created by lipeiwei on 16/9/30.
 */

import React from 'react';
import {
  StyleSheet
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import PictureContainer from './container/pictureContainer';
import ReadingContainer from './container/readingContainer';
import MusicContainer from './container/musicContainer';
import MovieContainer from './container/movieContainer';
import TabBar from './component/tabBar';

const styles = StyleSheet.create({

});

//tabbar图片资源
const tabBarResources = [
  [require('./image/home.png'), require('./image/home_active.png')],
  [require('./image/reading.png'), require('./image/reading_active.png')],
  [require('./image/music.png'), require('./image/music_active.png')],
  [require('./image/movie.png'), require('./image/movie_active.png')]
];
class MainContainer extends React.Component {

  render() {
    return (
      <ScrollableTabView
        tabBarPosition="bottom"
        locked={true}
        scrollWithoutAnimation={true}
        renderTabBar={() => {
          return <TabBar tabBarResources={tabBarResources}/>
        }}>
        <PictureContainer/>
        <ReadingContainer/>
        <MusicContainer/>
        <MovieContainer/>
      </ScrollableTabView>
    );
  }
}

MainContainer.propTypes = {

};

export default MainContainer;




