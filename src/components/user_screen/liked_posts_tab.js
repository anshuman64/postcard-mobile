// Library Imports
import React  from 'react';
import RN     from 'react-native';
import * as _ from 'lodash';

// Local Imports
import { styles }   from '../home_screen/home_screen_styles.js';
import { POST_TYPES }        from '../../actions/post_actions.js';
import PostList     from '../post_list/post_list.js';
import samplePosts  from '../../test_data/sample_posts.js';


//--------------------------------------------------------------------//

class LikedPostsTab extends React.Component {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    if (!this.props.likedPosts.lastUpdated) {
      this.props.refreshAndGetPosts(this.props.authToken, POST_TYPES.AUTHORED, {limit: 5})
      return;
    }

    let minsDiff = (Date() - this.props.likedPosts.lastUpdated) / (1000 * 60)
    if (minsDiff > 1) {
      this.props.refreshAndGetPosts(this.props.authToken, POST_TYPES.AUTHORED, {limit: 5})
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container} >
        <PostListContainer postType={POST_TYPES.LIKED} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default LikedPostsTab;
