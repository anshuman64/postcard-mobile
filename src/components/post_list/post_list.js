// Library Imports
import React  from 'react';
import RN     from 'react-native';
import _      from 'lodash';

// Local Imports
import PostListItemContainer  from './post_list_item_container.js';
import { styles }             from './post_list_styles.js';
import { POST_TYPES }         from '../../actions/post_actions.js';
import { COLORS }             from '../../utilities/style_utility.js';
import { defaultErrorAlert }  from '../../utilities/error_utility.js';

//--------------------------------------------------------------------//


class PostList extends React.PureComponent {
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

  _onRefresh = () => {
    this.setState({isRefreshing: true}, () => {
      this.flatList.scrollToOffset({x: 0, y: 0, animated: true});
      this.props.refreshPosts(this.props.authToken, this.props.firebaseUserObj, this.props.postType)
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
    if (this.props.posts.data.length === 0
        || this.props.posts.isEnd
        || this.state.isRefreshing
        || this.isLoading
        || this.onEndReachedCalledDuringMomentum) {
      return;
    }

    this.isLoading = true;
    this.onEndReachedCalledDuringMomentum = true;

    let lastPostId = this.props.posts.data[this.props.posts.data.length-1];
    this.props.getPosts(this.props.authToken, this.props.firebaseUserObj, this.props.postType, {start_at: lastPostId})
      .then(() => {
        this.isLoading = false;
      })
      .catch((error) => {
        defaultErrorAlert(error)
      })
  }

  _onContentSizeChange = () => {
    RN.AsyncStorage.getItem('scrollToTop')
      .then((value) => {
        if (value === 'true') {
          this.flatList.scrollToOffset({x: 0, y: 0, animated: true});
          RN.AsyncStorage.setItem('scrollToTop', 'false');
        }
      });
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
        refreshControl={ this._renderRefreshControl() }
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

export default PostList;
