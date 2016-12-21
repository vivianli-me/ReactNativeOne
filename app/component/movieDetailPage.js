/**
 * Created by lipeiwei on 16/10/9.
 */
import React, {PropTypes} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
  Platform
} from 'react-native';
import BaseComponent from '../base/baseComponent';
import {getMovieDetail, getMovieStory} from '../api/movie';
import MovieListItem from './movieListItem';
import commonStyle from '../style/commonStyle';
import {parseDate} from '../util/dateUtil';
import monthArray from '../constant/month';
import MovieInfo from './movieInfo';
import {getNavigator} from '../route';
import Toast from '../util/toast';
import LoadingManagerView from './loadingManagerView';
import CommentListView from './commentListView';
import CommentType from '../constant/commentType';

const styles = StyleSheet.create({
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  rowContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  authorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  authorInfo: {
    marginLeft: 10
  },
  authorName: {
    color: commonStyle.LIGHT_BLUE_COLOR
  },
  timeText: {
    color: commonStyle.TEXT_GRAY_COLOR,
    marginTop: 5
  },
  titleText: {
    marginVertical: 10,
    color: commonStyle.TEXT_COLOR,
    fontSize: 20,
    margin: 10
  },
  contentText: {
    color: commonStyle.TEXT_COLOR,
    fontSize: 16,
    margin: 10
  },
  grayViewContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: commonStyle.LIGHT_GRAY_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lightGrayText: {
    color: commonStyle.TEXT_GRAY_COLOR,
    fontSize: 14
  },
  smallIcon: {
    width: 45,
    height: 45,
  },
});

class MovieDetailPage extends BaseComponent {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.onTopImagePressed = this.onTopImagePressed.bind(this);
    this.renderMovieDetail = this.renderMovieDetail.bind(this);
    this.onSharePressed = this.onSharePressed.bind(this);
    this.state = {
      detailMovieData: null,
      movieStory: null,
      loadingStatus: LoadingManagerView.Loading
    };
  }

  getNavigationBarProps() {
    return {
      leftButtonImage: require('../image/return.png'),
      hideRightButton: true,
      title: this.props.simpleMovieData.title
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchData);
  }

  fetchData() {
    this.setState({//加载
      loadingStatus: LoadingManagerView.Loading
    });
    var movieDetailPromise = getMovieDetail(this.props.simpleMovieData.id);
    var movieStoryPromise = getMovieStory(this.props.simpleMovieData.id);
    Promise.all([movieDetailPromise, movieStoryPromise]).then(response => {
      var detailMovieData = response[0];
      var movieStory = response[1].data[0];
      this.setState({
        detailMovieData,
        movieStory,
        loadingStatus: LoadingManagerView.LoadingSuccess//加载成功
      });
    }).catch(error => {
      //失败处理
      this.setState({
        loadingStatus: LoadingManagerView.LoadingError//加载失败
      });
    });
  }

  renderBody() {
    const {loadingStatus, detailMovieData} = this.state;
    if (loadingStatus === LoadingManagerView.LoadingSuccess) {
      return (
        <CommentListView
          renderHeader={this.renderMovieDetail}
          type={CommentType.MOVIE}
          id={parseInt(detailMovieData.id)}/>
      );
    }
    return (
      <LoadingManagerView status={loadingStatus} onFetchData={this.fetchData}/>
    );
  }

  renderMovieDetail() {
    const {detailMovieData, movieStory} = this.state;
    const date = parseDate(movieStory.input_date);
    var day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    const dateStr = `${monthArray[date.getMonth()]} ${day}.${date.getFullYear()}`;
    return (
      <View>
        <MovieListItem imageStyle={{height: 200}} cover={detailMovieData.detailcover} score={detailMovieData.score} onPress={this.onTopImagePressed}/>
        <View style={{flexDirection: 'row', height: 50, justifyContent: 'flex-end', alignItems: 'center'}}>
          <TouchableOpacity onPress={this.onSharePressed}>
            <Image style={{width: 50, height: 50}} resizeMode="contain" source={require('../image/share_image.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.grayViewContainer}>
          <Text style={styles.lightGrayText}>电影故事</Text>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.authorInfoContainer}>
            <TouchableOpacity onPress={this.onAvatarImagePress}>
              <Image style={styles.avatarImage} source={{uri: movieStory.user.web_url}}/>
            </TouchableOpacity>
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{movieStory.user.user_name}</Text>
              <Text style={styles.timeText}>{dateStr}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.smallIcon} resizeMode="contain" source={require('../image/laud.png')}/>
            <Text style={{color: commonStyle.TEXT_GRAY_COLOR}}>{movieStory.praisenum}</Text>
          </View>
        </View>
        <Text style={styles.titleText}>{movieStory.title}</Text>
        <Text style={styles.contentText}>{movieStory.content}</Text>
        <MovieInfo detailMovieData={detailMovieData}/>
        <View style={styles.grayViewContainer}>
          <Text style={styles.lightGrayText}>评论列表</Text>
        </View>
      </View>
    );
  }

  onTopImagePressed() {
    const {detailMovieData} = this.state;
    if (detailMovieData && detailMovieData.video) {
      getNavigator().push({
        name: 'VideoPage',
        uri: detailMovieData.video,
        movieName: detailMovieData.title
      });
    } else {
      Toast.show('该电影暂无预告片');
    }

  }

  onAvatarImagePress() {

  }

  onSharePressed() {
    const {detailMovieData} = this.state;
    getNavigator().push({
      name: 'SharePage',
      shareData: {
        type: 'news',
        webpageUrl: detailMovieData.web_url,
        thumbImage: detailMovieData.indexcover,
        title: `《${detailMovieData.title}》` ,
        description: `${detailMovieData.officialstory}`
      }
    });
  }

}

MovieDetailPage.propTypes = {
  simpleMovieData: PropTypes.object.isRequired
};

export default MovieDetailPage;
