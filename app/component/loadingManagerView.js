/**
 * Created by lipeiwei on 16/10/18.
 */


import React, {PropTypes} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import LoadingView from './loadingView';
import LoadingErrorView from './loadingErrorView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  }
});

const LOADING = 'LOADING';
const LOADING_ERROR = 'LOADING_ERROR';
const LOADING_SUCCESS = 'LOADING_SUCCESS';
class LoadingManagerView extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    const {containerStyle} = this.props;
    switch (this.props.status) {
      case LOADING:
        return (
          <LoadingView containerStyle={containerStyle}/>
        );
      case LOADING_ERROR:
        return (
          <LoadingErrorView containerStyle={containerStyle} onPress={this.props.onFetchData}/>
        );
      case LOADING_SUCCESS:
        return null;
      default:{
        console.log(this.props.status,'fuck',LoadingManagerView.Loading);
        return (
            <View style={styles.container}>
              <Text style={styles.errorText}>状态定义错误</Text>
            </View>
        );
      }
    }
  }
}

LoadingManagerView.Loading = LOADING;//加载中
LoadingManagerView.LoadingError = LOADING_ERROR;//加载失败
LoadingManagerView.LoadingSuccess = LOADING_SUCCESS;//加载成功

LoadingManagerView.propTypes = {
  onFetchData: PropTypes.func,
  status: PropTypes.oneOf([LoadingManagerView.Loading, LoadingManagerView.LoadingError, LoadingManagerView.LoadingSuccess]).isRequired,
  containerStyle: PropTypes.object
};

export default LoadingManagerView;