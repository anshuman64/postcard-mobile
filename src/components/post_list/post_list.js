// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import ProfileHeaderContainer     from '../profile_header/profile_header_container.js';
import PostListItemContainer      from './post_list_item/post_list_item_container.js';
import { PROFILE_HEADER_HEIGHT }  from '../profile_header/profile_header_styles.js';
import { TAB_BAR_HEIGHT }         from '../tab_bar/tab_bar_styles.js';
import { styles }                 from './post_list_styles.js';
import { UTILITY_STYLES, COLORS } from '../../utilities/style_utility.js';
import { defaultErrorAlert }      from '../../utilities/error_utility.js';

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
      scrollY:      new RN.Animated.Value(0),
    };

    this.onEndReachedCalledDuringMomentum = true;
    this.isLoading = true;
    this._onRefresh = this._onRefresh.bind(this);
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  // Refreshes posts
  refresh(postType = this.props.postType) {
    this.isLoading = true;

    this.props.getPosts(this.props.client.authToken, this.props.client.firebaseUserObj, true, this.props.userId, postType, this.props.client.id === this.props.userId)
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
    this.props.getPosts(this.props.client.authToken, this.props.client.firebaseUserObj, false, this.props.userId, this.props.postType, this.props.client.id === this.props.userId, {start_at: lastPostId})
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
      <PostListItemContainer
        screen={this.props.screen}
        item={this.props.postsCache[item]}
        setFollowState={this.props.setFollowState}
        />
    )
  }

  _renderRefreshControl = () => {
    let offset;

    if (this.props.screen === 'ProfileScreen' || this.props.screen === 'UserScreen') {
      offset = PROFILE_HEADER_HEIGHT;
    } else {
      offset = 0;
    }

    return (
      <RN.RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this._onRefresh}
        color={COLORS.grey400}
        progressViewOffset={offset}
        />
    )
  }

  _renderProfileHeader = () => {
    if (this.props.screen === 'ProfileScreen' || this.props.screen === 'UserScreen') {
      return (
        <ProfileHeaderContainer
          screen={this.props.screen}
          scrollY={this.state.scrollY}
          userId={this.props.userId}
          postType={this.props.postType}
          setParentState={this.props.setParentState}
          />
      )
    } else {
      return null;
    }
  }

  _renderHeader = () => {
    if (this.props.screen === 'ProfileScreen' || this.props.screen === 'UserScreen') {
      return (
        <RN.View style={[styles.headerView, { height: PROFILE_HEADER_HEIGHT }]}>
          <RN.ActivityIndicator size='large' color={COLORS.grey400} style={{marginBottom: 20}} />
        </RN.View>
      )
    } else {
      return null;
    }
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
