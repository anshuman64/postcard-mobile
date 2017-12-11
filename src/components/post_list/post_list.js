// Library Imports
import React                                                         from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator }   from 'react-native';

// Local Imports
import { styles }    from './post_list_styles.js';
import PostListItem  from './post_list_item.js';

//--------------------------------------------------------------------//


class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      loading: false,
    };
  }

  _onRefresh() {
    this.setState({refreshing: true}, () => this.setState({refreshing: false}));
  }

  _onEndReached() {

  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderPostList() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={ this._renderItem }
        keyExtractor={(item, index) => index}
        style={ styles.postList }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        refreshControl={this._renderRefreshControl()}
        ListFooterComponent={this._renderFooter}
        />
    )
  }

  _renderItem = ({item}) => {
    return (
      <PostListItem item={item} />
    )
  }

  _renderRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
        color='#bdbdbd'
        />
    )
  }

  _renderFooter = () => {
    return (
      <ActivityIndicator size='small' color='#bdbdbd' style={styles.activityIndicator} />
    );
  };

  render() {
    return (
      <View style={ styles.container }>
        {this._renderPostList()}
      </View>
    )
  }
}

//--------------------------------------------------------------------//

export default PostList;
