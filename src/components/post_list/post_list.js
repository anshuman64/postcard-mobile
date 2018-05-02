// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import ProfileHeaderContainer    from '../profile_header/profile_header_container';
import PostListItemContainer     from '../post_list_item/post_list_item_container';
import ListFooter                from '../list_footer/list_footer';
import { PROFILE_HEADER_HEIGHT } from '../profile_header/profile_header_styles';
import { styles }                from './post_list_styles';
import { COLORS, scaleFont }     from '../../utilities/style_utility';
import { defaultErrorAlert }     from '../../utilities/error_utility';

//--------------------------------------------------------------------//

const AnimatedFlatList = RN.Animated.createAnimatedComponent(RN.FlatList);

/*
Required Passed Props:
  userId (int): user id of which the posts were retrieved
  postType (string): one of POST_TYPES
Optional Passed Props:
  isProfile (bool): determines if there should be a ProfileHeader
  isClient (bool): determines if the list is for the client
*/
class PostList extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      scrollY:      new RN.Animated.Value(0),
      isScreenMounted:     false,
    };

    this.onEndReachedCalledDuringMomentum = true;
    this.isLoading = false;
    this._onRefresh = this._onRefresh.bind(this);
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Renders the FlatList after other modal contents are mounted for performance
  componentDidMount() {
    setTimeout(() => this.setState({ isScreenMounted: true }), 10);
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
        this.setState({ isRefreshing: false });
        this.isLoading = false;
      });
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Refreshes posts with refresh indicator
  _onRefresh = (postType = this.props.postType) => {
    this.setState({ isRefreshing: true }, () => {
      this.refresh(postType);
    });
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

    let listData = this.props.posts[this.props.userId][this.props.postType].data;
    let lastPostId = listData[listData.length-1];
    this.props.getPosts(this.props.client.authToken, this.props.client.firebaseUserObj, false, this.props.userId, this.props.postType, this.props.client.id === this.props.userId, {start_at: lastPostId})
      .catch((error) => {
        defaultErrorAlert(error)
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  _onPressAddFriends = () => {
    this.props.navigateTo('PendingScreen');
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  // NOTE/WARNING: leave keyExtractor exactly as is, or else fadeOut messes up other items around it!
  _renderPostList = () => {
    let postData = this.props.posts[this.props.userId];

    if (this.state.isScreenMounted) {
      return (
        <AnimatedFlatList
          ref={(ref) => this.flatList = ref}
          data={(postData && postData[this.props.postType]) ? postData[this.props.postType].data : null}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={(item) => this.props.postsCache[item].id}
          style={styles.postList}
          initialNumToRender={3}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          onEndReached={this._onEndReached}
          refreshControl={this._renderRefreshControl()}
          ListHeaderComponent={this._renderActivityIndicatorHeader}
          ListFooterComponent={this._renderFooter}
          onMomentumScrollBegin={() => this.onEndReachedCalledDuringMomentum = false}
          onEndReachedThreshold={0.01}
          onScroll={RN.Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}], {useNativeDriver: true})}
          scrollEventThrottle={16}
          />
      )
    }
  }

  _renderItem = ({item}) => {
    return (
      <PostListItemContainer item={this.props.postsCache[item]} postType={this.props.postType} isClient={this.props.isClient} />
    )
  }

  _renderRefreshControl = () => {
    let offset = 0;
    if (this.props.isProfile) {
      offset = PROFILE_HEADER_HEIGHT;
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
    if (this.props.isProfile) {
      return (
        <ProfileHeaderContainer scrollY={this.state.scrollY} userId={this.props.userId} isClient={this.props.isClient}/>
      )
    } else {
      return null;
    }
  }

  _renderActivityIndicatorHeader = () => {
    if (this.props.isProfile) {
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
    let postData = this.props.posts[this.props.userId];

    if (postData && postData[this.props.postType] && postData[this.props.postType].isEnd) {
      return (
        <ListFooter footerWidth={scaleFont(200)} text={'No more Posts?'} highlightedText={' Add Friends'} callback={this._onPressAddFriends} />
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
      <RN.View style={styles.postList}>
        {this._renderPostList()}
        {this._renderProfileHeader()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default PostList;
