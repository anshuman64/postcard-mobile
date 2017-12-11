// Library Imports
import React                      from 'react';
import { View, Text, FlatList }   from 'react-native';

// Local Imports
import PostList                 from '../post_list/post_list.js';
import samplePosts              from '../../test_data/sample_posts.js';


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
