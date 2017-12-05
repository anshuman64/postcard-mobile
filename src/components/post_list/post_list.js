// Library Imports
import React                                                         from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator }   from 'react-native';

// Local Imports
import { styles, scaleFactor }  from './post_list_styles.js';
import PostListItem             from './post_list_item.js';

//--------------------------------------------------------------------//


class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      loading: false,
    };
  }

  _renderItem = ({item}) => {
    return (
      <PostListItem item={item} />
    )
  }

  _onRefresh() {
    this.setState({refreshing: true}, () => this.setState({refreshing: false}));
  }

  _onEndReached() {

  }

  renderFooter = () => {
    return (
      <ActivityIndicator size='small' color='#bdbdbd' style={styles.activityIndicator} />
    );
  };

  render() {
    return (
      <View style={[styles.container]}>
        <FlatList
          data={this.props.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index}
          style={{width: '100%', height: '100%'}}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            color='#bdbdbd'
            />}
          ListFooterComponent={this.renderFooter}
          />
      </View>
    )
  }
}

//--------------------------------------------------------------------//

export default PostList;