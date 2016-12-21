/**
 * Created by lipeiwei on 16/10/10.
 */

import React, {PropTypes} from 'react';
import {
  ListView,
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import commonStyle from '../style/commonStyle';
import {getNavigator} from '../route';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: commonStyle.GRAY_COLOR
  },
  lightGrayText: {
    color: commonStyle.TEXT_GRAY_COLOR,
    fontSize: 14
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  smallIcon: {
    width: 50,
    height: 50,
  },
  commonText: {
    fontSize: 16,
    color: commonStyle.TEXT_COLOR
  },
  storyContainer: {
    margin: 10
  },
  titleText: {
    color: commonStyle.TEXT_COLOR,
    fontSize: 18,
  },
  authorNameText: {
    marginVertical: 10,
    color: commonStyle.LIGHT_BLUE_COLOR
  }
});

const TEXT = [
  '音乐故事',
  '歌词',
  '歌曲信息'
];

//TODO 图片跳动的问题
const IMAGE_ARRAY = [
  [require('../image/music_story_default.png'), require('../image/music_story_selected.png')],
  [require('../image/music_lyric_default.png'), require('../image/music_lyric_selected.png')],
  [require('../image/music_about_default.png'), require('../image/music_about_selected.png')]
];

class MusicInfo extends React.Component {

  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.renderMusicStory = this.renderMusicStory.bind(this);
    this.renderTouchableOpacityImage = this.renderTouchableOpacityImage.bind(this);
    this.state = {
      currentIndex: 0//0 , 1 , 2 //分别对应音乐故事/歌词/歌曲信息
    };
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.lightGrayText}>{TEXT[this.state.currentIndex]}</Text>
          {this.renderTouchableOpacityImage()}
        </View>
        {this.renderContent()}
      </View>
    );
  }

  renderTouchableOpacityImage() {
    return (
      <View style={styles.rowContainer}>
        {
          IMAGE_ARRAY.map((image, index) => {
            let imageSource = image[this.state.currentIndex === index ? 1 : 0];
            return (
              <TouchableOpacity
                style={{marginLeft: 10}}
                key={index}
                onPress={() => this.state.currentIndex !== index && this.setState({currentIndex: index})}
                activeOpacity={1}>
                <Image style={styles.smallIcon} resizeMode="cover" source={imageSource}/>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }

  renderContent() {
    const {musicDetailData} = this.props;
    switch (this.state.currentIndex) {
      case 0:
        return this.renderMusicStory();
      case 1:
        return (
          <Text style={[styles.commonText, {margin: 10}]}>{musicDetailData.lyric}</Text>
        );
      case 2:
        return (
          <Text style={[styles.commonText, {margin: 10}]}>{musicDetailData.info}</Text>
        );
      default:
        break;
    }
  }

  renderMusicStory() {
    const {musicDetailData} = this.props;
    return (
      <View style={styles.storyContainer}>
        <Text style={styles.titleText}>{musicDetailData.story_title}</Text>
        <Text style={styles.authorNameText}>{musicDetailData.story_author.user_name}</Text>
        <Text style={styles.commonText}>{musicDetailData.story}</Text>

      </View>
    );
  }

}

MusicInfo.propTypes = {
  musicDetailData: PropTypes.object.isRequired
};

export default MusicInfo;