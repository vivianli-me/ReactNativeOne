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

const styles = StyleSheet.create({

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
        refreshControl={this.getRefreshControl()}
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
        <ActivityIndicator/>
      );
    } else {
      return (
        <View style={{alignItems: 'center'}}>
          <Text>没有更多数据了</Text>
        </View>
      );
    }
  }

}

GiftedListView.propTypes = {
  // ...ListView.propTypes,
  emptyView: PropTypes.element,//dataSource数据为空时显示的View
  hasMore: PropTypes.bool,
  fetchLatestData: PropTypes.func,
  fetchMoreData: PropTypes.func,
  refreshing: PropTypes.bool,
};

export default GiftedListView;
