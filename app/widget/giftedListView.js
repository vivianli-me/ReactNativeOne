/**
 * Created by lipeiwei on 16/10/9.
 */

import React, {PropTypes} from 'react';
import {
  ListView,
  Text,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  View
} from 'react-native';
import commonStyle from '../style/commonStyle';

const styles = StyleSheet.create({
  hasNoMoreView: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  hasNoMoreText: {
    color: commonStyle.LIGHT_BLUE_COLOR,
    fontSize: 16,
    marginVertical: 5,
  }
});

const defaultOnEndReachedThreshold = 150;

class GiftedListView extends React.Component {

  constructor(props) {
    super(props);
    this.getRefreshControl = this.getRefreshControl.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  componentWillMount() {
    this.onRefresh();
  }

  render() {
    return (
      <ListView
        {...this.props}
        enableEmptySections
        onEndReached={this.onEndReached}
        renderFooter={this.renderFooter}
        OnEndReachedThreshold={defaultOnEndReachedThreshold}
      />
    );
  }

  getRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.props.refreshing}
        onRefresh={this.onRefresh}/>
    );
  }

  onRefresh() {
    //加载最新
    this.props.fetchLatestData && this.props.fetchLatestData();
  }

  onEndReached() {
    //加载更多
    !this.props.refreshing && this.props.hasMore && this.props.fetchMoreData && this.props.fetchMoreData();
  }

  renderFooter() {
    //正在下拉加载最新
    if (this.props.refreshing) {
      return null;
    }
    if (this.props.hasMore) {
      return (
        <ActivityIndicator color={commonStyle.LIGHT_BLUE_COLOR}/>
      );
    } else if (this.props.renderHasNoMoreView) {
      return this.props.renderHasNoMoreView();//使用自定义的
    } else {
      return (
        <View style={styles.hasNoMoreView}>
          <Text style={styles.hasNoMoreText}>没有更多数据了</Text>
        </View>
      );
    }
  }

}

GiftedListView.propTypes = {
  // ...ListView.propTypes,
  emptyView: PropTypes.func,//dataSource数据为空时显示的View
  hasMore: PropTypes.bool.isRequired,
  refreshing: PropTypes.bool.isRequired,
  fetchLatestData: PropTypes.func.isRequired,
  fetchMoreData: PropTypes.func.isRequired,
  renderHasNoMoreView: PropTypes.func
};

export default GiftedListView;
