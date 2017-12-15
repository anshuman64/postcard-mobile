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
    this.props.refreshPosts(this.props.authToken, POST_TYPES.LIKED)
  }

  componentWillUpdate() {
    if (this.props.isUserScreenFocused) {
      let currentTime = new Date();
      let lastUpdate = this.props.likedPosts.lastUpdated;
      let minsDiff = (currentTime - lastUpdate) / (1000 * 5)

      if (minsDiff > 1) {
        this.props.refreshPosts(this.props.authToken, POST_TYPES.LIKED)
      }
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
