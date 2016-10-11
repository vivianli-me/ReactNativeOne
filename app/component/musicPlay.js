/**
 * Created by lipeiwei on 16/10/11.
 */

import React, {PropTypes} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {parseDate} from '../util/dateUtil';
import monthArray from '../constant/month';
import commonStyle from '../style/commonStyle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: commonStyle.GRAY_COLOR
  },
  leftContainer: {
    justifyContent: 'space-between',
  },
  rightContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  authorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorInfo: {
    marginLeft: 10
  },
  authorName: {
    color: commonStyle.LIGHT_BLUE_COLOR,
    fontSize: 12
  },
  authorDesc: {
    color: commonStyle.TEXT_GRAY_COLOR,
    marginTop: 5,
    fontSize: 12
  },
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: commonStyle.LIGHT_BLUE_COLOR
  },
  dateText: {
    color: commonStyle.TEXT_GRAY_COLOR,
    marginTop: 5,
    fontSize: 12
  },
  musicImage: {
    height: 40,
    width: 40,
  },
  xiamiImage: {
    width: 60,
    height: 20,
  },
  titleText: {
    color: commonStyle.TEXT_COLOR,
    fontSize: 18,
    marginTop: 5
  },
  transparentImage: {
    backgroundColor: 'transparent'
  }
});

class MusicPlay extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {musicDetailData} = this.props;
    if (!musicDetailData) {
      return null;
    }
    const date = parseDate(musicDetailData.maketime);
    var day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    const dateStr = `${monthArray[date.getMonth()]} ${day}.${date.getFullYear()}`;
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.authorInfoContainer}>
            <TouchableOpacity style={{marginVertical: 5}} onPress={this.onAvatarImagePress}>
              <Image style={styles.avatarImage} source={{uri: musicDetailData.author.web_url}}/>
            </TouchableOpacity>
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{musicDetailData.author.user_name}</Text>
              <Text style={styles.authorDesc}>{musicDetailData.author.desc}</Text>
            </View>
          </View>
          <Text style={styles.titleText}>{musicDetailData.title}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Image style={styles.xiamiImage}
                 source={musicDetailData.platform == 1 ? require('../image/xiami_right.png') : null}
                 resizeMode="contain"/>
          <TouchableOpacity>
            <Image style={styles.musicImage} source={require('../image/music_play.png')}/>
          </TouchableOpacity>
          <Text style={styles.dateText}>{dateStr}</Text>
        </View>
      </View>
    );
  }

}

MusicPlay.propTypes = {
  musicDetailData: PropTypes.object.isRequired
};

export default MusicPlay;
