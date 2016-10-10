/**
 * Created by lipeiwei on 16/10/10.
 */

import React, {PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,

} from 'react-native';
import commonStyle from '../style/commonStyle';

const styles = StyleSheet.create({
  outsideContainer: {
    margin: 2,
    borderWidth: 2,
    borderColor: commonStyle.LIGHT_BLUE_COLOR,
  },
  innerContainer: {
    margin: 3,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: commonStyle.LIGHT_BLUE_COLOR
  },
  splitLine: {
    width: 1,
    backgroundColor: commonStyle.LIGHT_BLUE_COLOR
  },
  text: {
    color: commonStyle.LIGHT_BLUE_COLOR,
    fontSize: 14,
    marginVertical: 10
  }

});


class MovieKeywordsChart extends React.Component {
  render() {
    const {keywords} = this.props;
    return (
      <View style={styles.outsideContainer}>
        <View style={styles.innerContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={styles.text}>{keywords[0]}</Text>
            <View style={styles.splitLine}/>
            <Text style={styles.text}>{keywords[1]}</Text>
            <View style={styles.splitLine}/>
            <Text style={styles.text}>{keywords[2]}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: commonStyle.LIGHT_BLUE_COLOR}}>
            <Text style={styles.text}>{keywords[3]}</Text>
            <View style={styles.splitLine}/>
            <Text style={styles.text}>{keywords[4]}</Text>
          </View>
        </View>
      </View>
    );
  }
}

MovieKeywordsChart.propTypes = {
  keywords: PropTypes.array.isRequired
};

export default MovieKeywordsChart;