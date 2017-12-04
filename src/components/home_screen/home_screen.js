// Library Imports
import React                                from 'react';
import { Button, StyleSheet, Text, View, FlatList }   from 'react-native';

// Local Imports
import { styles, scaleFactor }  from './home_screen_styles.js';
import samplePosts from '../../resources/sample_posts.js';
import PostListItem from '../post_list_item.js';
import { toNewPostScreen }                  from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//


class HomeScreen extends React.Component {

  _renderItem = ({item}) => {
    return (
      <PostListItem item={item} />
    )
  }

  render() {
    return (
      <View style={[styles.container]}>
        <FlatList
          data={samplePosts}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id}
          style={{width: '100%', height: '100%'}}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicate={false}
          />
      </View>
    )
  }
}

//--------------------------------------------------------------------//

export default HomeScreen;
