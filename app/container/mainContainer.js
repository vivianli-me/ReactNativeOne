/**
 * Created by lipeiwei on 16/10/4.
 */

import React from 'react';
import {
  StyleSheet
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import PictureContainer from './pictureContainer';
import ReadingContainer from './readingContainer';
import MusicContainer from './musicContainer';
import MovieContainer from './movieContainer';
import TabBar from '../component/tabBar';

const styles = StyleSheet.create({
  /**
   * iOS平台下, react-native-scrollable-tab-view是用ScrollView实现的
   * 当react-native-scrollable-tab-view嵌套react-native-viewpager时, 需要给react-native-scrollable-tab-view的子View设置overflow='hidden',
   * ScrollView的removeClippedSubviews才能起作用, 将不在屏幕可视范围的视图移除掉.
   */
  subView: {
    overflow: 'hidden'
  }
});

//tabbar图片资源
const TAB_BAR_RESOURCES = [
  [require('../image/home.png'), require('../image/home_active.png')],
  [require('../image/reading.png'), require('../image/reading_active.png')],
  [require('../image/music.png'), require('../image/music_active.png')],
  [require('../image/movie.png'), require('../image/movie_active.png')]
];

class MainContainer extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <ScrollableTabView
        tabBarPosition="bottom"
        locked={true}
        scrollWithoutAnimation={true}
        prerenderingSiblingsNumber={4}
        renderTabBar={() => {
          /*使用自定义tabbar*/
          return <TabBar tabBarResources={TAB_BAR_RESOURCES}/>
        }}>
        <PictureContainer style={styles.subView}/>
        <ReadingContainer style={styles.subView}/>
        <MusicContainer style={styles.subView}/>
        <MovieContainer style={styles.subView}/>
      </ScrollableTabView>
    );
  }
}

export default MainContainer;
