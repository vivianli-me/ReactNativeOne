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
import MovieKeywordsChart from './movieKeywordsChart';
import {getNavigator} from '../route';

const styles = StyleSheet.create({
  grayViewContainer: {
    paddingHorizontal: 10,
    backgroundColor: commonStyle.LIGHT_GRAY_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  image: {
    width: 150,
    height: 150,
  },
  separatorView: {
    width: 3
  }
});

const TEXT = [
  '一个.电影表',
  '剧照',
  '影片信息'
];

const IMAGE_ARRAY = [
  [require('../image/gross_default.png'), require('../image/gross_selected.png')],
  [require('../image/still_default.png'), require('../image/still_selected.png')],
  [require('../image/plot_default.png'), require('../image/plot_selected.png')]
];

class MovieInfo extends React.Component {

  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
    this.renderTouchableOpacityImage = this.renderTouchableOpacityImage.bind(this);
    this.state = {
      currentIndex: 0//0 , 1 , 2 //分别对应一个电影表/剧照/影片信息
    };
  }

  render() {
    return (
      <View>
        <View style={styles.grayViewContainer}>
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
    const {detailMovieData} = this.props;
    switch (this.state.currentIndex) {
      case 0:
        let keywords = detailMovieData.keywords.split(';');
        return (
          <MovieKeywordsChart keywords={keywords}/>
        );
      case 1:
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(detailMovieData.photo);
        return (
          <ListView
            horizontal={true}
            dataSource={dataSource}
            renderRow={this.renderListItem}
            renderSeparator={this.renderSeparator}
          />
        );
      case 2:
        return (
          <Text style={{marginLeft: 10, marginVertical: 3}}>{detailMovieData.info}</Text>
        );
      default:
        break;
    }
  }

  renderListItem(uri, sectionID, rowID) {
    return (
      <TouchableOpacity key={rowID} onPress={() => this.onAvatarPressed(uri)}>
        <Image style={styles.image} resizeMode="cover" source={{uri}}/>
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View key={rowID} style={styles.separatorView}/>
    );
  }

  onAvatarPressed(uri) {
    getNavigator().push({
      name: 'ImageViewer',
      source: {uri}
    });
  }



}

MovieInfo.propTypes = {
  detailMovieData: PropTypes.object.isRequired
};

export default MovieInfo;
