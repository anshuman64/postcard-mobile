// Library Imports
import React                      from 'react';
import RN from 'react-native';

// Local Imports
import { styles, scaleFactor }  from './home_screen_styles.js';
import PostList                 from '../post_list/post_list.js';
import samplePosts              from '../../resources/sample_posts.js';


//--------------------------------------------------------------------//


class HomeScreen extends React.Component {
  componentWillMount() {
    this.props.getPosts(null, this.props.authToken)
  }

  render() {
    return (
      <PostList data={samplePosts} />
    )
  }
}

//--------------------------------------------------------------------//

export default HomeScreen;
