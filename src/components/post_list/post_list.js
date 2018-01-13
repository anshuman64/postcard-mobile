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
      scrollY: new RN.Animated.Value(0)
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
    if (this.state.scrollToTop) {
      this.flatList.getNode().getscrollToOffset({x: 0, y: 0, animated: true});
      this.setState({ scrollToTop: false });
    }
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  refresh(postType = this.props.postType) {
    this.props.refreshPosts(this.props.authToken, this.props.firebaseUserObj, this.props.userId, postType)
      .catch((error) => {
        defaultErrorAlert(error);
      })
      .finally(() => {
        this.setState({ isRefreshing: false });
        this.isLoading = false;
      })
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onRefresh = () => {
    this.isLoading = true;
    this.setState({ isRefreshing: true }, () => {
      this.flatList.getNode().scrollToOffset({ x: 0, y: 0, animated: true });
      this.refresh();
    })
  }

  _onEndReached = () => {
    if (this.state.isRefreshing
        || this.isLoading
        || this.onEndReachedCalledDuringMomentum
        || this.props.posts[this.props.userId][this.props.postType].data.length === 0
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
        style={ styles.postList }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        onEndReached={this._onEndReached}
        refreshControl={this._renderRefreshControl()}
        ListHeaderComponent={() => <RN.View style={{height: this.props.currentScreen === 'HomeScreen' ? 0 : 270}}/>}
        ListFooterComponent={ this._renderFooter }
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
        onEndReachedThreshold={0.01}
        onScroll={RN.Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}], {useNativeDriver: true})}
        scrollEventThrottle={16}
        />
    )
  }

  _renderItem = ({item}) => {
    return (
      <PostListItemContainer item={this.props.postsCache[item]} />
    )
  }

  _renderRefreshControl = () => {
    return (
      <RN.RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this._onRefresh}
        color={COLORS.grey400}
        progressViewOffset={this.props.currentScreen === 'HomeScreen' ? 0 : 270}
        />
    )
  }

  _renderHeader = () => {
    return (
      <ProfileHeaderContainer scrollY={this.state.scrollY} userId={this.props.userId} username={this.props.username} avatarUrl={this.props.avatarUrl} postType={this.props.postType} setParentState={this.props.setParentState} />
    )
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
    return (
      <RN.View style={[styles.container, (this.props.currentScreen === 'UserScreenAuthored' || this.props.currentScreen === 'UserScreenLiked') && styles.minusHeader]}>
        {this._renderPostList()}
        {this._renderHeader()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default PostList;
