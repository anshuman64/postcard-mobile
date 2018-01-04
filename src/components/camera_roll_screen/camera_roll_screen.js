// Library Imports
import React  from 'react';
import RN     from 'react-native';
import _      from 'lodash';

// Local Imports
import { styles }             from './camera_roll_screen_styles.js';
import { defaultErrorAlert }  from '../../utilities/error_utility.js';

//--------------------------------------------------------------------//


class CameraRollScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    };

    this.onEndReachedCalledDuringMomentum = true;
    this.isLoading = false;
    this._onRefresh = this._onRefresh.bind(this);
  }


  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onEndReached() {
    // if (this.props.posts.data.length === 0
    //     || this.props.posts.isEnd
    //     || this.state.isRefreshing
    //     || this.isLoading
    //     || this.onEndReachedCalledDuringMomentum) {
    //   return;
    // }
    //
    // this.isLoading = true;
    // this.onEndReachedCalledDuringMomentum = true;
    //
    // let lastPostId = this.props.posts.data[this.props.posts.data.length-1];
    // this.props.getPosts(this.props.authToken, this.props.firebaseUserObj, this.props.postType, {start_at: lastPostId})
    //   .then(() => {
    //     this.isLoading = false;
    //   })
    //   .catch((error) => {
    //     defaultErrorAlert(error)
    //   })
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderPostList() {
    return (
      <RN.FlatList
        ref={(ref) => this.flatList = ref}
        data={ this.props.posts.data }
        renderItem={ this._renderItem.bind(this) }
        keyExtractor={(item) => this.props.postsCache[item].id}
        style={ styles.postList }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        onEndReached={() => this._onEndReached()}
        ListFooterComponent={ this._renderFooter }
        onContentSizeChange={this._onContentSizeChange}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
        onEndReachedThreshold={0.01}
        />
    )
  }

  _renderItem = ({item}) => {
    return (
      <PostListItemContainer item={this.props.postsCache[item]} />
    )
  }

  _renderRefreshControl() {
    return (
      <RN.RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this._onRefresh}
        color={COLORS.grey400}
        />
    )
  }

  _renderFooter = () => {
    if (this.props.posts.isEnd) {
      return (
        <RN.View style={ styles.footerView }>
          <RN.View style={ styles.horizontalLine } />
          <RN.Text style={ styles.footerText }>
            No More Posts
          </RN.Text>
          <RN.View style={ styles.horizontalLine } />
        </RN.View>
      )
    } else {
      return (
        <RN.View style={ styles.footerView }>
          <RN.ActivityIndicator size='small' color={COLORS.grey400} style={styles.activityIndicator} />
        </RN.View>
      )
    }
  };

  render() {
    return (
      <RN.View style={ styles.container }>
        {this._renderPostList()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default CameraRollScreen;