/**
 * Created by lipeiwei on 16/10/9.
 */
import React, {PropTypes} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,

} from 'react-native';
import BaseComponent from '../base/baseComponent';

class MovieDetailPage extends BaseComponent {

  constructor(props) {
    super(props);
  }

  getNavigationBarProps() {
    return {
      leftButtonImage: require('../image/return.png'),
      hideRightButton: true,
      title: this.props.simpleMovieData.title
    };
  }

  renderBody() {
    return null;
  }

}

MovieDetailPage.propTypes = {
  simpleMovieData: PropTypes.object.isRequired
};

export default MovieDetailPage;
