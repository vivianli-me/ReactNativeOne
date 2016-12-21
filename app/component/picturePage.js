/**
 * Created by lipeiwei on 16/10/2.
 */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView
} from 'react-native';
import commonStyle from '../style/commonStyle';
import weekArray from '../constant/week';
import monthArray from '../constant/month';
import { parseDate } from '../util/dateUtil';
import BaseComponent from '../base/baseComponent';
import {getNavigator} from '../route';
import {getPictureDetail} from '../api/picture';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 10
  },
  topViewContainer: {
    //怎么实现阴影,模糊边框
    borderWidth: 1,
    borderColor: commonStyle.GRAY_COLOR,
    padding: 10
  },
  contentImage: {
    height: 250
  },
  pictureInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pictureInfoText: {
    fontSize: 12,
    color: commonStyle.TEXT_GRAY_COLOR
  },
  content: {
    marginTop: 20,
    fontSize: 15,
    color: commonStyle.TEXT_COLOR
  },
  date: {
    marginTop: 30,
    fontSize: 14,
    color: commonStyle.TEXT_GRAY_COLOR,
    alignSelf: 'flex-end'
  },
  bottomViewContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  smallIcon: {
    width: 45,
    height: 45,
  },
  bottomText: {
    fontSize: 14,
    color: commonStyle.TEXT_GRAY_COLOR
  },
  shareImage: {
    marginLeft: 10
  }
});

class PicturePage extends BaseComponent {

  constructor(props) {
    super(props);
    this.renderTouchableBlock = this.renderTouchableBlock.bind(this);
    this.toEditDiary = this.toEditDiary.bind(this);
    this.praise = this.praise.bind(this);
    this.sharePicture = this.sharePicture.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      data: this.props.data
    };
  }

  getNavigationBarProps() {
    return {
      hideNav: false,
      hideLeftButton: false,
      hideRightButton: true,
      title: '图文',
      leftButtonImage: require('../image/return.png')
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    if (this.state.data) {//已经通过props传递数据了
      return;
    }
    const {id} = this.props;//通过网络请求获取
    if (id) {
      getPictureDetail(id).then(data => {
        this.setState({
          data
        });
      }).catch(() => {
        console.warn('加载失败');
      });
    } else {
      console.warn('The Component PicturePage error because of the props');
    }
  }

  renderBody() {
    var {data} = this.state;
    if (!data) {
      return null;
    }
    var date = parseDate(data.hp_makettime);
    var day = date.getDate();
    if (day < 10) {
      day = `0${day}`;//不足两位补全两位
    }
    var dateStr = weekArray[date.getDay()] + ' ' + day + ' ' + monthArray[date.getMonth()] + '.' + date.getFullYear();
    return (
      <ScrollView style={styles.scrollView}>
        <View>
          <View style={styles.topViewContainer}>
            <TouchableOpacity onPress={() => this.onImagePress(data.hp_img_url)} activeOpacity={1}>
              <Image style={styles.contentImage} source={{uri: data.hp_img_url}}/>
            </TouchableOpacity>
            <View style={styles.pictureInfoContainer}>
              <Text style={styles.pictureInfoText}>{data.hp_title}</Text>
              <Text style={styles.pictureInfoText}>{data.hp_author}</Text>
            </View>
            <Text style={styles.content}>{data.hp_content}</Text>
            <Text style={styles.date}>{dateStr}</Text>
          </View>
          <View style={styles.bottomViewContainer}>
            {this.renderTouchableBlock(require('../image/diary.png'), '小记', this.toEditDiary)}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {this.renderTouchableBlock(require('../image/laud.png'), data.praisenum, this.praise)}
              <TouchableOpacity style={styles.shareImage} activeOpacity={0} onPress={this.sharePicture}>
                <Image style={styles.smallIcon} resizeMode="contain" source={require('../image/share_image.png')}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  renderTouchableBlock(imageSource, text, onPress) {
    return (
      <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} activeOpacity={1} onPress={onPress}>
        <Image style={styles.smallIcon} source={imageSource}/>
        <Text style={styles.bottomText}>{text}</Text>
      </TouchableOpacity>
    );
  }

  toEditDiary() {
    //跳转到编辑页面
  }


  praise() {
    //点赞or取消点赞
  }

  sharePicture() {
    //分享
    const {data} = this.state;
    getNavigator().push({
      name: 'SharePage',
      shareData: {
        type: 'news',
        webpageUrl: data.web_url,
        thumbImage: data.hp_img_url,
        title: data.hp_title,
        description: data.hp_content
      }
    });
  }

  onImagePress(uri) {
    getNavigator().push({
      source: {uri},
      name: 'ImageViewer'
    });
  }

}

PicturePage.propTypes = {
  data: React.PropTypes.object,
  id: React.PropTypes.number
};

export default PicturePage;












