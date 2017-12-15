// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import PostListContainer  from '../post_list/post_list_container.js';
import { styles }         from '../home_screen/home_screen_styles.js';
import { POST_TYPES }     from '../../actions/post_actions.js';


//--------------------------------------------------------------------//

class LikedPostsTab extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    if (!this.props.likedPosts.lastUpdated) {
      this.props.refreshPosts(this.props.authToken, POST_TYPES.LIKED, {limit: 5})
      return;
    }

    let minsDiff = (Date() - this.props.likedPosts.lastUpdated) / (1000 * 60)
    if (minsDiff > 1) {
      this.props.refreshPosts(this.props.authToken, POST_TYPES.LIKED, {limit: 5})
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container} >
        <PostListContainer posts={this.props.likedPosts} postType={POST_TYPES.LIKED} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default LikedPostsTab;
