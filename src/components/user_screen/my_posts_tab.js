// Library Imports
import React                                from 'react';
import { Button, StyleSheet, Text, View }   from 'react-native';
import { connect }                          from 'react-redux';

// Local Imports
import samplePosts from '../../resources/sample_posts.js';
import PostList from '../post_list/post_list.js';

//--------------------------------------------------------------------//


class MyPostsTab extends React.Component {

  render() {
    return (
      <PostList data={samplePosts} />
    )
  }
}

//--------------------------------------------------------------------//

export default MyPostsTab;
