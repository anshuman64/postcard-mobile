// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import PostList     from '../post_list/post_list.js';
import samplePosts  from '../../test_data/sample_posts.js';


//--------------------------------------------------------------------//


class HomeScreen extends React.Component {

  componentDidMount() {
    // this.props.getAllPosts(this.props.authToken);
    // debugger;
  }

  render() {
    return (
      <PostList data={this.props.postsCache} />
    )
  }
}

//--------------------------------------------------------------------//

export default HomeScreen;
