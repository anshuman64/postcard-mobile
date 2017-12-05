// Library Imports
import React                                from 'react';
import { Button, StyleSheet, Text, View, FlatList }   from 'react-native';

// Local Imports
import { styles, scaleFactor }  from './post_list_styles.js';
import PostListItem from './post_list_item.js';
import { toNewPostScreen }                  from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//


class PostList extends React.Component {

  _renderItem = ({item}) => {
    return (
      <PostListItem item={item} />
    )
  }

  render() {
    return (
      <View style={[styles.container]}>
        <FlatList
          data={this.props.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id}
          style={{width: '100%', height: '100%'}}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          />
      </View>
    )
  }
}

//--------------------------------------------------------------------//

export default PostList;
