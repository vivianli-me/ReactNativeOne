/**
 * Created by lipeiwei on 16/10/14.
 */

import React, {PropTypes} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  DeviceEventEmitter
} from 'react-native';
import {connect} from 'react-redux';
import * as MediaActions from '../actions/media';
import {getNavigator} from '../route';

const EVENT_NAME = 'ON_MEDIA_COMPLETION';

const styles = StyleSheet.create({
  authorName: {
    marginTop: 30
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    height: 60,
  },
  bottomTouchableOpacity: {
    backgroundColor: '#00000088',
    flex: 1
  }
});

class MusicControlModal extends React.Component {

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.goToDetailPage = this.goToDetailPage.bind(this);
  }
  
  componentDidMount() {
    const {
      turnToNextOne
    } = this.props;
    DeviceEventEmitter.addListener(EVENT_NAME, () => {
      console.log('播放完成');
      turnToNextOne();//当前先实现顺序循环吧, 单曲循环跟随机播放以后再说
    });
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners(EVENT_NAME);
  }

  //隐藏modal
  closeModal() {
    this.props.changeMusicControlModalVisibility(false);
  }

  render() {
    const {
      musicName,
      authorName,
      isPlayingMedia,//当前是否正在播放音乐
      stopPlayMedia,
      startPlayMedia,
      turnToPreviousOne,
      turnToNextOne
    } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isMusicControlModalShow}
        onRequestClose={() => {}}>
        <View style={{backgroundColor: 'white', alignItems: 'center', padding: 10}}>
          <Text>{musicName}</Text>
          <Text style={styles.authorName}>{authorName}</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.imageContainer} onPress={turnToPreviousOne}>
              <Image style={styles.image} resizeMode="contain" source={require('../image/last.png')}/>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.imageContainer} onPress={isPlayingMedia ? stopPlayMedia : () => startPlayMedia()}>
              <Image style={styles.image} resizeMode="contain" source={isPlayingMedia ? require('../image/article_pause.png'): require('../image/article_play.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageContainer} onPress={turnToNextOne}>
              <Image style={styles.image} resizeMode="contain" source={require('../image/next.png')}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={this.goToDetailPage}>
            <Image style={{width: 40, height: 40}} resizeMode="contain" source={require('../image/detail_content.png')}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.bottomTouchableOpacity}
          onPress={this.closeModal}/>
      </Modal>
    );
  }
  goToDetailPage() {
    const {currentMedia} = this.props;
    if (!currentMedia) {
      return;
    }
    //type 'essay' 'music'
    const {type, id} = currentMedia;
    this.closeModal();
    getNavigator().push({
      name: type === 'essay' ? 'ReadingEssayDetail': 'MusicDetailPage',
      id: parseInt(id)
    });

  }


}

MusicControlModal.propTypes = {
  musicName: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  isPlayingMedia: PropTypes.bool.isRequired,//当前是否正在播放音乐
  isMusicControlModalShow: PropTypes.bool.isRequired,
  changeMusicControlModalVisibility: PropTypes.func.isRequired,
  currentMedia: PropTypes.object
};

const mapStateToProps = state => {
  let media = state.media;
  let mediaList = media.mediaList;
  if (mediaList.length === 0) {
    return {
      musicName: '',
      authorName: '',
      isPlayingMedia: false,
      isMusicControlModalShow: false
    };
  }
  let currentMedia = mediaList[media.currentIndex];
  return {
    currentMedia,
    musicName: currentMedia.musicName,
    authorName: currentMedia.authorName,
    isPlayingMedia: media.isPlayingMedia,
    isMusicControlModalShow: media.isMusicControlModalShow
  };
};

export default connect(mapStateToProps, MediaActions)(MusicControlModal);