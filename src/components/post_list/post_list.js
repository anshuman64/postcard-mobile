// Library Imports
import React  from 'react';
import RN     from 'react-native';
import _      from 'lodash';

// Local Imports
import ProfileHeaderContainer from '../profile_header/profile_header_container.js';
import PostListItemContainer  from './post_list_item/post_list_item_container.js';
import { styles }             from './post_list_styles.js';
import { POST_TYPES }         from '../../actions/post_actions.js';
import { COLORS }             from '../../utilities/style_utility.js';
import { defaultErrorAlert }  from '../../utilities/error_utility.js';

//--------------------------------------------------------------------//


class PostsScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      scrollToTop:  false,
    };

    this.onEndReachedCalledDuringMomentum = true;
    this.isLoading = false;
    this._onRefresh = this._onRefresh.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Scroll to top when having created a new post if returning to Home Screen or Authored Post Tab
    if (this.props.scrollToTop != nextProps.scrollToTop) {
      this.setState({ scrollToTop: true });
    }
  }

  componentDidUpdate() {
    if (this.state.scrollToTop) {
      this.flatList.scrollToOffset({x: 0, y: 0, animated: true});
      this.setState({ scrollToTop: false });
    }
  }



  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onRefresh = (postType = this.props.postType) => {
    this.setState({ isRefreshing: true }, () => {
      this.flatList.scrollToOffset({ x: 0, y: 0, animated: true });
      this.props.refreshPosts(this.props.authToken, this.props.firebaseUserObj, this.props.userId, postType)
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.setState({ isRefreshing: false });
        })
    })
  }

  _onEndReached() {
    if (this.props.posts[this.props.userId][this.props.postType].data.length === 0
        || this.props.posts[this.props.userId][this.props.postType].isEnd
        || this.state.isRefreshing
        || this.isLoading
        || this.onEndReachedCalledDuringMomentum) {
      return;
    }

    this.isLoading = true;
    this.onEndReachedCalledDuringMomentum = true;

    let lastPostId = this.props.posts[this.props.userId][this.props.postType].data[this.props.posts[this.props.userId][this.props.postType].data.length-1];
    this.props.getPosts(this.props.authToken, this.props.firebaseUserObj, this.props.userId, this.props.postType, {start_at: lastPostId})
      .catch((error) => {
        defaultErrorAlert(error)
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

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

  _renderHeader = () => {
    if (this.props.currentScreen === '_ProfileScreen' || this.props.currentScreen === '_UserScreen') {
      return (
        <ProfileHeaderContainer postType={this.props.postType} setParentState={this.props.setParentState} />
      )
    } else {
      return null;
    }
  }

  _renderFooter = () => {
    if (this.props.posts[this.props.userId] && this.props.posts[this.props.userId][this.props.postType] && this.props.posts[this.props.userId][this.props.postType].isEnd) {
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
    debugger
    return (
      <RN.View style={ styles.container }>
        <RN.FlatList
          ref={(ref) => this.flatList = ref}
          data={ (this.props.posts[this.props.userId] && this.props.posts[this.props.userId][this.props.postType]) ?
            this.props.posts[this.props.userId][this.props.postType].data :
            null
          }
          renderItem={ this._renderItem.bind(this) }
          keyExtractor={(item) => this.props.postsCache[item].id}
          style={ styles.postList }
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          onEndReached={() => this._onEndReached()}
          refreshControl={ this._renderRefreshControl() }
          ListHeaderComponent={ this._renderHeader }
          ListFooterComponent={ this._renderFooter }
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          onEndReachedThreshold={0.01}
          />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default PostsScreen;
