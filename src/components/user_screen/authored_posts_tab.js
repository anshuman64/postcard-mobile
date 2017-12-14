// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import PostListContainer  from '../post_list/post_list_container.js';
import { POST_TYPES }     from '../../actions/post_actions.js';
import { styles }         from '../home_screen/home_screen_styles.js';


//--------------------------------------------------------------------//

class AuthoredPostsTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authoredPostsData: [],
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    if (!this.props.authoredPosts.lastUpdated) {
      this.props.refreshPosts(this.props.authToken, POST_TYPES.AUTHORED, {limit: 5})
      return;
    }

    let minsDiff = (Date() - this.props.authoredPosts.lastUpdated) / (1000 * 60)
    if (minsDiff > 1) {
      this.props.refreshPosts(this.props.authToken, POST_TYPES.AUTHORED, {limit: 5})
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container} >
        <PostListContainer posts={this.props.authoredPosts} postType={POST_TYPES.AUTHORED} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default AuthoredPostsTab;
