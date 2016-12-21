/**
 * Created by lipeiwei on 16/10/18.
 */

import React, {PropTypes} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import commonStyle from '../style/commonStyle';
import {parseDate} from '../util/dateUtil';
import monthArray from '../constant/month';

const styles = StyleSheet.create({
  container: {
  },
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
  smallIcon: {
    width: 45,
    height: 45,
  },
  score: {
    color: 'red',
    fontSize: 18,
    marginRight: 10,
  },
  contentText: {
    color: commonStyle.TEXT_COLOR,
    fontSize: 16,
    margin: 10
  },
  quoteContainer: {
    marginHorizontal: 15,
    padding: 8,
    borderWidth: 1,
    borderColor: commonStyle.GRAY_COLOR
  },
  quoteText: {
    color: commonStyle.TEXT_GRAY_COLOR,
    fontSize: 16,
    marginTop: 5
  }
});

/**
 * 只有电影可能会有score字段, 代表着右上角的评分
 * type == 0 代表是热评, type == 1 普通评论
 * quote是引用, 如果quote跟touser同时不为空, 则代表是回复别人的话, quote限定两行
 * 时间用created_at字段
 */

class CommentItem extends React.Component {

  constructor(props) {
    super(props);
    this.renderQuote = this.renderQuote.bind(this);
  }

  render() {
    //引用, 评论内容, 点赞数, 创建时间, 用户信息,
    const {content, praisenum, created_at, user, type, score} = this.props.commentData;
    const {user_name, web_url} = user;//评论作者的名字跟头像
    const date = parseDate(created_at);
    var day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    const dateStr = `${monthArray[date.getMonth()]} ${day}.${date.getFullYear()}`;
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.authorInfoContainer}>
            <TouchableOpacity onPress={this.onAvatarImagePress}>
              <Image style={styles.avatarImage} source={{uri: web_url}}/>
            </TouchableOpacity>
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{user_name}</Text>
              <Text style={styles.timeText}>{dateStr}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {
              score ? (<Text style={styles.score}>{score}</Text>) : null
            }
            <Image style={styles.smallIcon} resizeMode="contain" source={require('../image/laud.png')}/>
            <Text style={{color: commonStyle.TEXT_GRAY_COLOR}}>{praisenum}</Text>
          </View>
        </View>
        {this.renderQuote()}
        <Text style={styles.contentText}>{content}</Text>
      </View>
    );
  }

  renderQuote() {
    const {quote, touser} = this.props.commentData;
    if (quote && touser) {
      const {user_name} = touser;
      return (
        <View style={styles.quoteContainer}>
          <Text style={{color: commonStyle.TEXT_COLOR, fontSize: 18}}>{user_name}:</Text>
          <Text numberOfLines={2} style={styles.quoteText}>{quote}</Text>
        </View>
      );
    }
    return null;
  }

  onAvatarImagePress() {

  }

}

CommentItem.propTypes = {
  commentData: PropTypes.object.isRequired
};

export default CommentItem;