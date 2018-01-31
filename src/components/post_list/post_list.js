// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import ProfileHeaderContainer                                from '../profile_header/profile_header_container.js';
import PostListItemContainer                                 from './post_list_item/post_list_item_container.js';
import { PROFILE_HEADER_HEIGHT, PROFILE_HEADER_TABS_HEIGHT } from '../profile_header/profile_header_styles.js';
import { styles }                                            from './post_list_styles.js';
import { UTILITY_STYLES, COLORS }                            from '../../utilities/style_utility.js';
import { defaultErrorAlert }                                 from '../../utilities/error_utility.js';

//--------------------------------------------------------------------//

const AnimatedFlatList = RN.Animated.createAnimatedComponent(RN.FlatList);

class PostList extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      scrollToTop:  false,
      scrollY:      new RN.Animated.Value(0),
    };

    this.onEndReachedCalledDuringMomentum = true;
    this.isLoading = true;
    this._onRefresh = this._onRefresh.bind(this);
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentWillReceiveProps(nextProps) {
    // Scroll to top when having created a new post if returning to Home Screen or Authored Post Tab
    if (this.props.scrollToTop != nextProps.scrollToTop) {
      this.setState({ scrollToTop: true });
    }
  }

  componentDidUpdate() {
    // Scrolls postList to top
    if (this.state.scrollToTop) {
      this.flatList.getNode().scrollToOffset({x: 0, y: 0, animated: true});
      this.setState({ scrollToTop: false });
    }
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  // Refreshes posts
  refresh(postType = this.props.postType) {
    this.isLoading = true;
    this.props.refreshPosts(this.props.authToken, this.props.firebaseUserObj, this.props.userId, postType)
      .catch((error) => {
        defaultErrorAlert(error);
      })
      .finally(() => {
        this.setState({ isRefreshing: false }, () => {
          this.isLoading = false;
        });
      })
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Refreshes posts with refresh indicator
  _onRefresh = (postType = this.props.postType) => {
    this.setState({ isRefreshing: true }, () => {
      this.refresh(postType);
    })
  }

  // Gets more posts when end is reached
  _onEndReached = () => {
    if (this.state.isRefreshing
        || this.isLoading
        || this.onEndReachedCalledDuringMomentum
        || this.props.posts[this.props.userId][this.props.postType].data.length === 0 // order matters; this might not exist!
        || this.props.posts[this.props.userId][this.props.postType].isEnd) {
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

  _renderPostList = () => {
    return (
      <AnimatedFlatList
        ref={(ref) => this.flatList = ref}
        data={ (this.props.posts[this.props.userId] && this.props.posts[this.props.userId][this.props.postType]) ?
          this.props.posts[this.props.userId][this.props.postType].data :
          null
        }
        renderItem={this._renderItem.bind(this)}
        keyExtractor={(item) => this.props.postsCache[item].id}
        style={styles.postList}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        onEndReached={this._onEndReached}
        refreshControl={this._renderRefreshControl()}
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
        onMomentumScrollBegin={() => this.onEndReachedCalledDuringMomentum = false}
        onEndReachedThreshold={0.01}
        onScroll={RN.Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}], {useNativeDriver: true})}
        scrollEventThrottle={16}
        />
    )
  }

  _renderItem = ({item}) => {
    return (
      <PostListItemContainer item={this.props.postsCache[item]} userId={this.props.userId} setFollowState={this.props.setFollowState} />
    )
  }

  // !this.props.username is an indicator for this.props.currentScreen === 'HomScreen'
  _renderRefreshControl = () => {
    return (
      <RN.RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this._onRefresh}
        color={COLORS.grey400}
        progressViewOffset={!this.props.username ? PROFILE_HEADER_TABS_HEIGHT : PROFILE_HEADER_HEIGHT}
        />
    )
  }

  _renderProfileHeader = () => {
    return (
      <ProfileHeaderContainer
        scrollY={this.state.scrollY}
        userId={this.props.userId}
        username={this.props.username}
        avatarUrl={this.props.avatarUrl}
        isFollowed={this.props.isFollowed}
        postType={this.props.postType}
        setParentState={this.props.setParentState}
        setFollowState={this.props.setFollowState}
        />
    )
  }

  _renderHeader = () => {
    return (
      <RN.View style={[styles.headerView, !this.props.username && { height: PROFILE_HEADER_TABS_HEIGHT }]}>
        <RN.ActivityIndicator size='large' color={!this.props.username ? 'transparent' : COLORS.grey400} style={{marginBottom: 20}} />
      </RN.View>
    )
  }

  _renderFooter = () => {
    if (this.props.posts[this.props.userId] && this.props.posts[this.props.userId][this.props.postType] && this.props.posts[this.props.userId][this.props.postType].isEnd) {
      return (
        <RN.View style={styles.footerView}>
          <RN.View style={styles.horizontalLine} />
          <RN.Text style={styles.footerText}>
            No More Posts
          </RN.Text>
          <RN.View style={styles.horizontalLine} />
        </RN.View>
      )
    } else {
      return (
        <RN.View style={styles.footerView}>
          <RN.ActivityIndicator size='small' color={COLORS.grey400} />
        </RN.View>
      )
    }
  };

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        {this._renderPostList()}
        {this._renderProfileHeader()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default PostList;
