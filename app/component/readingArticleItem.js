/**
 * Created by lipeiwei on 16/10/5.
 */


import React, {PropTypes} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import commonStyle from '../style/commonStyle';
import {getNavigator} from '../route';

const styles = StyleSheet.create({
  touchableOpacity: {
    padding: 15,//使用padding而不用margin是为了增大可按压区域
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  titleText: {
    color: commonStyle.TEXT_COLOR,
    fontSize: 18,
    flex: 1
  },
  text: {
    color: commonStyle.TEXT_GRAY_COLOR,
    fontSize: 14,
    marginTop: 5
  },
  image: {
    height: 25,
    width: 60,
  }
});

class ReadingArticleItem extends React.Component {
  render() {
    const {data} = this.props;
    let title, authorName, content;
    let imageSource;
    if (data.content_id) {
      title = data.hp_title;
      authorName = data.author[0].user_name;//为什么这个author字段是个数组, 跟其他的又不一样
      content = data.guide_word;
      imageSource = require('../image/essay_image.png');
    } else if (data.serial_id) {
      title = data.title;
      authorName = data.author.user_name;
      content = data.excerpt;
      imageSource = require('../image/serial_image.png');
    } else if (data.question_id) {
      title = data.question_title;
      authorName = data.answer_title;
      content = data.answer_content;
      imageSource = require('../image/question_image.png');
    }
    return (
      <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.onPress(data)}>
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Image style={styles.image} resizeMode="contain" source={imageSource}/>
          </View>
          <Text style={styles.text}>{authorName}</Text>
          <Text style={styles.text}>{content}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  onPress(data) {
    let name, id;
    if (data.content_id) {
      name = 'ReadingEssayDetail';
      id = data.content_id;
    } else if (data.serial_id) {
      name = 'ReadingSerialDetail';
      id = data.id;
    } else if (data.question_id) {
      name = 'ReadingQuestionDetail';
      id = data.question_id;
    }
    getNavigator().push({name,id: parseInt(id)});

  }
}

ReadingArticleItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ReadingArticleItem;

const essayData = {
  "content_id": "1547",
  "hp_title": "他没有名字，他叫9527",
  "hp_makettime": "2016-10-04 21:00:00",
  "guide_word": "我们小区刚有人入住的时候，9527是第一个来摆摊卖水果的。男人离不开啤酒，女人离不开水果，这是自古的道理。",
  "author": [
    {
      "user_id": "5541614",
      "user_name": "绒绒",
      "web_url": "http://image.wufazhuce.com/FnT7-zyYmZeammnFD1IuG14i2Nkg",
      "desc": "一个喜欢讲故事的梦想家，已出版《输一回吧，姑娘》。",
      "wb_name": "@小绒绒往前走"
    }
  ],
  "has_audio": true
};

const serialData = {
  "id": "184",
  "serial_id": "33",
  "number": "4",
  "title": "玩家·第四话",
  "excerpt": "5W，你到底是不慎容纳了一些怪胎，还是本身就是按照一个怪胎集中营来设计的？",
  "read_num": "7400",
  "maketime": "2016-10-04 21:00:00",
  "author": {
    "user_id": "4813765",
    "user_name": "夜X",
    "web_url": "http://image.wufazhuce.com/Fkr-24izoJEPeeKJ0Zwga9xB325N",
    "desc": "作家，编剧。公众号：不投币故事贩卖机"
  },
  "has_audio": false
};

const questionData = {
  "question_id": "1496",
  "question_title": "作家会爱上笔下的人物吗？",
  "answer_title": "@蔡骏 答BonBon：",
  "answer_content": "人物既是作家在创造，到了一定阶段以后，也是人物根据其内在规律，他们自己在创造自己。",
  "question_makettime": "2016-10-04 21:00:00"
};