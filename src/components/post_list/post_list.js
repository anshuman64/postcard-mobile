// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import PostListItemContainer  from './post_list_item_container.js';
import { styles }             from './post_list_styles.js';
import { POST_TYPES }        from '../../actions/post_actions.js';
import { COLORS }             from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


class PostList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    };
  }


  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // TODO: make refreshPost a promise
  _onRefresh() {
    this.setState({isRefreshing: true}, () => {
      this.props.refreshPosts(this.props.authToken, this.props.postType, {limit: 5});
      this.setState({isRefreshing: false});
    })
  }

  _onEndReached() {
    if (this.props.posts.data.length === 0 || this.props.posts.isEnd) {
      return;
    }

    let lastPostId = this.props.posts.data[this.props.posts.data.length-1];
    this.props.getPosts(this.props.authToken, this.props.postType, {start_at: lastPostId, limit: 5})
  }

  // TODO: slide flatlist when newPost is created
  // _onContentSizeChange = () => {
  //   if (this.props.isNew) {
  //     this.flatList.scrollToOffset({x: 0, y: 0, animated: true})
  //   }
  // }

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
        onRefresh={this._onRefresh.bind(this)}
        color={COLORS.grey400}
        />
    )
  }

  _renderFooter = () => {
    if (this.props.posts.isEnd) {
      return (
        <RN.Text>
          No More Posts
        </RN.Text>
      )
    } else {
      return (
        <RN.ActivityIndicator size='small' color={COLORS.grey400} style={styles.activityIndicator} />
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
