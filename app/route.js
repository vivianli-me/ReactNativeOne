/**
 * Created by lipeiwei on 16/10/4.
 */
import MainContainer from './container/mainContainer';
import BeforeMonthList from './component/beforeMonthList';
import BeforePictureList from './component/beforePictureList';
import PicturePage from './component/picturePage';
import ImageViewer from './component/imageViewer';
import ReadingCarouselDetail from './component/readingCarouselDetail';
import ReadingBeforeMonthList from './component/readingBeforeMonthList'
import ReadingArticleList from './component/readingArticleList';
import ReadingEssayDetail from './component/readingEssayDetail';
import ReadingSerialDetail from './component/readingSerialDetail';
import ReadingQuestionDetail from './component/readingQuestionDetail';
import MovieDetailPage from './component/movieDetailPage';
import MusicListPage from './component/musicListPage';
import MusicDetailPage from './component/musicDetailPage';
import VideoPage from './component/videoPage';
import MusicControlModal from './component/musicControlModal';
import SharePage from './component/sharePage';
import MyGithubPage from './component/myGithubPage';
import {
  Navigator,
} from 'react-native';

let navigator;

// PushFromRight
// PushFromLeft
// FloatFromRight
// FloatFromLeft
// FloatFromBottom
// FloatFromBottomAndroid
// FadeAndroid
// HorizontalSwipeJump
// HorizontalSwipeJumpFromRight
// VerticalUpSwipeJump
// VerticalDownSwipeJump

const routeMap = new Map();

routeMap.set('MainContainer', {
  component: MainContainer
});
routeMap.set('BeforeMonthList', {
  component: BeforeMonthList
});
routeMap.set('BeforePictureList', {
  component: BeforePictureList
});
routeMap.set('PicturePage', {
  component: PicturePage
});
routeMap.set('ImageViewer', {
  component: ImageViewer,
  sceneAnimation: Navigator.SceneConfigs.FadeAndroid
});
routeMap.set('ReadingCarouselDetail', {
  component: ReadingCarouselDetail
});
routeMap.set('ReadingBeforeMonthList', {
  component: ReadingBeforeMonthList
});
routeMap.set('ReadingArticleList', {
  component: ReadingArticleList
});
routeMap.set('ReadingEssayDetail', {
  component: ReadingEssayDetail
});
routeMap.set('ReadingSerialDetail', {
  component: ReadingSerialDetail
});
routeMap.set('ReadingQuestionDetail', {
  component: ReadingQuestionDetail
});
routeMap.set('MovieDetailPage', {
  component: MovieDetailPage
});
routeMap.set('MusicListPage', {
  component: MusicListPage
});
routeMap.set('MusicDetailPage', {
  component: MusicDetailPage
});
routeMap.set('MusicControlModal', {
  component: MusicControlModal
});
routeMap.set('VideoPage', {
  component: VideoPage,
  sceneAnimation: Navigator.SceneConfigs.FadeAndroid
});
routeMap.set('SharePage', {
  component: SharePage,
  sceneAnimation: Navigator.SceneConfigs.FloatFromBottom
});

routeMap.set('MyGithubPage', {
  component: MyGithubPage,
  sceneAnimation: Navigator.SceneConfigs.FloatFromBottom
});


export function registerNavigator(tempNavigator) {
  if (navigator) {
    return;
  }
  navigator = tempNavigator;

}

export function getNavigator() {
  return navigator;
}

export function getRouteMap() {
  return routeMap;
}






