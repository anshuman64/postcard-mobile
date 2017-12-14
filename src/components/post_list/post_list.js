// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { styles }             from './post_list_styles.js';
import PostListItemContainer  from './post_list_item_container.js';
import { COLORS }             from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    };
  }



  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onRefresh() {
    this.setState({isRefreshing: true}, () => {
      this.props.getPosts(this.props.authToken, true, {limit: 5}).then(() => {
        this.setState({isRefreshing: false})
      })
    })
  }

  _onEndReached() {
    if (this.props.data.length === 0 || this.props.isEnd) {
      return;
    }

    let lastPostId = this.props.data[this.props.data.length-1].id;
    this.props.getPosts(this.props.authToken, false, {start_at: lastPostId, limit: 5})
  }

  _onContentSizeChange = () => {
    if (this.props.isNew) {
      this.flatList.scrollToOffset({x: 0, y: 0, animated: true})
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderPostList() {
    return (
      <RN.FlatList
        ref={(ref) => this.flatList = ref}
        data={ this.props.data }
        renderItem={ this._renderItem }
        keyExtractor={(item) => item.id}
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
      <PostListItemContainer item={item} />
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
    if (this.props.isEnd) {
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
