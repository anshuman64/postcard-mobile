// Library Imports
import React  from 'react';

// Local Imports
import PostList     from '../post_list/post_list.js';
import samplePosts  from '../../resources/sample_posts.js';


//--------------------------------------------------------------------//

// TODO: rename to authored posts
class MyPostsTab extends React.Component {

  render() {
    return (
      <PostList data={samplePosts} />
    )
  }
}

//--------------------------------------------------------------------//

export default MyPostsTab;
