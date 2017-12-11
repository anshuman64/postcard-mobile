// Library Imports
import React  from 'react';

// Local Imports
import PostList     from '../post_list/post_list.js';
import samplePosts  from '../../test_data/sample_posts.js';


//--------------------------------------------------------------------//

class AuthoredPostsTab extends React.Component {

  render() {
    return (
      <PostList data={samplePosts} />
    )
  }
}

//--------------------------------------------------------------------//

export default AuthoredPostsTab;
