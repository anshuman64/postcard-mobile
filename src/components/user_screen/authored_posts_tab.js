// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import PostListContainer      from '../post_list/post_list_container.js';
import { styles }             from '../home_screen/home_screen_styles.js';
import { POST_TYPES }         from '../../actions/post_actions.js';


//--------------------------------------------------------------------//

class AuthoredPostsTab extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.postList.getWrappedInstance()._onRefresh();
  }

  //TODO: prevent refreshPosts from being called twice
  componentWillReceiveProps (nextProps) {
    if (this.props.currentScreen != '_AuthoredPostsTab' && nextProps.currentScreen === '_AuthoredPostsTab') {
      let currentTime = new Date();
      let lastUpdate = this.props.authoredPosts.lastUpdated;
      let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

      if (minsDiff > 1) {
        this.postList.getWrappedInstance()._onRefresh();
      }
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//


  render() {
    return (
      <RN.View style={styles.container} >
        <PostListContainer ref={(ref) => this.postList = ref} posts={this.props.authoredPosts} postType={POST_TYPES.AUTHORED} scrollToTop={this.props.scrollToTop} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default AuthoredPostsTab;
