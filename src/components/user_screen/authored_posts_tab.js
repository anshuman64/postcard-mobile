// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import PostListContainer      from '../post_list/post_list_container.js';
import { styles }             from '../home_screen/home_screen_styles.js';
import { POST_TYPES }         from '../../actions/post_actions.js';
import { defaultErrorAlert }  from '../../utilities/error_utility.js';


//--------------------------------------------------------------------//

class AuthoredPostsTab extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.props.refreshPosts(this.props.authToken, POST_TYPES.AUTHORED)
      .catch((error) => defaultErrorAlert(error))
  }

  //TODO: prevent refreshPosts from being called twice
  // Debug Test
  // componentWillReceiveProps (nextProps) {
  //   if (this.props.currentScreen != '_AuthoredPostsTab' && nextProps.currentScreen === '_AuthoredPostsTab') {
  //     let currentTime = new Date();
  //     let lastUpdate = this.props.authoredPosts.lastUpdated;
  //     let minsDiff = (currentTime - lastUpdate) / (1000 * 60);
  //
  //     if (minsDiff > 1) {
  //       this.postList.getWrappedInstance()._onRefresh();
  //     }
  //   }
  // }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//


  render() {
    return (
      <RN.View style={styles.container} >
        <PostListContainer ref={(ref) => this.postList = ref} posts={this.props.authoredPosts} postType={POST_TYPES.AUTHORED} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default AuthoredPostsTab;
