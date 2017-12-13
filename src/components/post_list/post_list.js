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
      refreshing: false,
    };
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

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
      <RN.FlatList
        data={ this.props.data }
        renderItem={ this._renderItem }
        keyExtractor={(item) => item.id}
        style={ styles.postList }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        refreshControl={ this._renderRefreshControl() }
        ListFooterComponent={ this._renderFooter }
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
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
        color={COLORS.grey400}
        />
    )
  }

  _renderFooter = () => {
    return (
      <RN.ActivityIndicator size='small' color={COLORS.grey400} style={styles.activityIndicator} />
    );
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
