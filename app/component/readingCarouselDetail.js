/**
 * Created by lipeiwei on 16/10/5.
 */


import React, {PropTypes} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ListView,
  Dimensions,
  StyleSheet
} from 'react-native';
import BaseComponent from '../base/baseComponent';
import {getReadingImageDetail} from '../api/reading';
import ReadingCarouselDetailItem from './readingCarouselDetailItem';
import {getNavigator} from '../route'

const windowWidth  = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomViewContainer: {
    alignItems: 'center'
  },
  bottomText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 40,
  },
  bottomImage: {
    width: windowWidth,
    height: 150,
    marginTop: 60
  }
});

class ReadingCarouselDetail extends BaseComponent {

  constructor(props) {
    super(props);
    this.renderFooter = this.renderFooter.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  getNavigationBarProps() {
    return {
      hideNav: false,
      hideLeftButton: false,
      hideRightButton: true,
      title: this.props.data.title,
      leftButtonImage: require('../image/close.png')
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    getReadingImageDetail(this.props.data.id).then(detailDataList => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(detailDataList)
      });
    });
  }

  renderBody() {
    const {bgcolor} = this.props.data;
    return (
      <ListView
        style={[styles.container, {backgroundColor: bgcolor}]}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
        />

    );
  }

  

  renderRow(detailData, sectionID, rowID) {
    return (
      <ReadingCarouselDetailItem
        detailData={detailData}
        rowID={parseInt(rowID)}
        onPress={() => this.onPress(detailData)}
      />
    );
  }

  onPress(detailData) {
    let type = detailData.type;
    let componentName;
    if (type == 1) {
      componentName = 'ReadingEssayDetail';
    } else if (type == 2) {
      componentName = 'ReadingSerialDetail';
    } else if (type == 3) {
      componentName = 'ReadingQuestionDetail';
    }
    getNavigator().push({
      name: componentName,
      id: parseInt(detailData.item_id)
    });
  }


  renderFooter() {
    const {cover, bottom_text} = this.props.data;
    return (
      <View style={styles.bottomViewContainer}>
        <Text style={[styles.bottomText, {marginVertical: 40}]}>_____________</Text>
        <Text style={styles.bottomText}>{bottom_text}</Text>
        <Image source={{uri: cover}} style={styles.bottomImage}/>
      </View>
    );
  }

}

ReadingCarouselDetail.propTypes = {
  data: PropTypes.object.isRequired//简略信息
};

export default ReadingCarouselDetail;

