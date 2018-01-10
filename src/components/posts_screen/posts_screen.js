// Library Imports
import React  from 'react';
import RN     from 'react-native';
import _      from 'lodash';

// Local Imports
import ProfileHeaderContainer from '../profile_header/profile_header_container.js';
import PostListItemContainer  from '../post_list_item/post_list_item_container.js';
import { styles }             from './posts_screen_styles.js';
import { POST_TYPES }         from '../../actions/post_actions.js';
import { COLORS }             from '../../utilities/style_utility.js';
import { defaultErrorAlert }  from '../../utilities/error_utility.js';

//--------------------------------------------------------------------//


class PostsScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userId:       0,
      postType:     POST_TYPES.ALL,
      isRefreshing: false,
      scrollToTop:  false,
    };

    this.onEndReachedCalledDuringMomentum = true;
    this.isLoading = false;
    this._onRefresh = this._onRefresh.bind(this);
  }

  componentDidMount() {
    if (this.props.currentScreen === '_ProfileScreen') {
      this.setState({ userId: this.props.user.id, postType: POST_TYPES.AUTHORED }, () => {
        this._onRefresh();
        this._onRefresh(POST_TYPES.LIKED);
      });
    } else if (this.props.currentScreen === '_UserScreen') {
      this.setState({ userId: this.props.userId, postType: POST_TYPES.AUTHORED }, () => {
        this._onRefresh();
        this._onRefresh(POST_TYPES.LIKED);
      });
    } else {
      this._onRefresh();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentScreen === this.props.currentScreen && nextProps.postType && nextProps.postType != this.state.postType) {
      this.setState({ postType: nextProps.postType });
    }
    // if (this.props.currentScreen != '_HomeScreen' && nextProps.currentScreen === '_HomeScreen') {
    //   let currentTime = new Date();
    //   let lastUpdate = this.props.allPosts.lastUpdated;
    //   let minsDiff = (currentTime - lastUpdate) / (1000 * 60);
    //
    //   if (minsDiff > 1) {
    //     this._onRefresh();
    //   }
    // }
    //
    // if (this.props.scrollToTop != nextProps.scrollToTop) {
    //   this.setState({scrollToTop: true})
    // }
  }

  componentDidUpdate() {
    if (this.state.scrollToTop) {
      this.flatList.scrollToOffset({x: 0, y: 0, animated: true});
      this.setState({scrollToTop: false})
    }
  }

  setParentState = (state) => {
    return () => (this.setState(state));
  }


  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onRefresh = (postType = this.state.postType) => {
    this.setState({isRefreshing: true}, () => {
      this.flatList.scrollToOffset({x: 0, y: 0, animated: true});
      this.props.refreshPosts(this.props.authToken, this.props.firebaseUserObj, this.state.userId, postType)
        .then(() => {
          this.setState({isRefreshing: false});
        })
        .catch((error) => {
          this.setState({isRefreshing: false});
          defaultErrorAlert(error);
        })
    })
  }

  _onEndReached() {
    if (this.props.posts[this.state.userId][this.state.postType].data.length === 0
        || this.props.posts[this.state.userId][this.state.postType].isEnd
        || this.state.isRefreshing
        || this.isLoading
        || this.onEndReachedCalledDuringMomentum) {
      return;
    }

    this.isLoading = true;
    this.onEndReachedCalledDuringMomentum = true;

    let lastPostId = this.props.posts[this.state.userId][this.state.postType].data[this.props.posts[this.state.userId][this.state.postType].data.length-1];
    this.props.getPosts(this.props.authToken, this.props.firebaseUserObj, this.state.userId, this.state.postType, {start_at: lastPostId})
      .then(() => {
        this.isLoading = false;
      })
      .catch((error) => {
        defaultErrorAlert(error)
      })
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderPostList() {
    return (
      <RN.FlatList
        ref={(ref) => this.flatList = ref}
        data={ (this.props.posts[this.state.userId] && this.props.posts[this.state.userId][this.state.postType]) ? this.props.posts[this.state.userId][this.state.postType].data : null }
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

  _renderHeader = () => {
    if (this.props.currentScreen != '_HomeScreen') {
      return (
        <ProfileHeaderContainer postType={this.state.postType} setParentState={this.setParentState} />
      )
    } else {
      return null;
    }
  }

  _renderFooter = () => {
    if (this.props.posts[this.state.userId] && this.props.posts[this.state.userId][this.state.postType] && this.props.posts[this.state.userId][this.state.postType].isEnd) {
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

export default PostsScreen;
