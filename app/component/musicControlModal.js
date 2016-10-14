/**
 * Created by lipeiwei on 16/10/14.
 */

import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native';

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
    this.state = {
      modalVisible: true
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (

      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {}}>
        <View style={{backgroundColor: 'white', alignItems: 'center', padding: 10}}>
          <Text>浪费</Text>
          <Text style={styles.authorName}>林宥嘉</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.imageContainer}>
              <Image style={styles.image} resizeMode="contain" source={require('../image/last.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageContainer}>
              <Image style={styles.image} resizeMode="contain" source={require('../image/article_play.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageContainer}>
              <Image style={styles.image} resizeMode="contain" source={require('../image/next.png')}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={this.goToDetailPage}>
            <Image style={{width: 40, height: 40}} resizeMode="contain" source={require('../image/detail_content.png')}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.bottomTouchableOpacity}
          onPress={() => this.setModalVisible(false)}/>
      </Modal>
    );
  }

  goToDetailPage() {

  }


}

export default MusicControlModal;