// Library Imports
import React                                from 'react';
import { Button, StyleSheet, Text, View, FlatList }   from 'react-native';

// Local Imports
import { styles, scaleFactor }  from './home_screen_styles.js';
import samplePosts from '../../resources/sample_posts.js';
import PostList from '../post_list/post_list.js';

//--------------------------------------------------------------------//


class HomeScreen extends React.Component {

  render() {
    return (
      <PostList data={samplePosts} />
    )
  }
}

//--------------------------------------------------------------------//

export default HomeScreen;
