// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import TabBarContainer    from '../../components/tab_bar/tab_bar_container';
import PostListContainer  from '../../components/post_list/post_list_container';
import { POST_TYPES }     from '../../actions/post_actions';
import { UTILITY_STYLES } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

class PostScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Auto-refresh screen if coming back to it after > 2 minutes
  componentWillReceiveProps(nextProps) {
    if (this.props.currentScreen != 'RecentScreen' && nextProps.currentScreen === 'RecentScreen') {
      this._checkRefresh(POST_TYPES.PUBLIC);
    } else if (this.props.currentScreen != 'FollowingScreen' && nextProps.currentScreen === 'FollowingScreen') {
      this._checkRefresh(POST_TYPES.FOLLOWED);
    }
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _checkRefresh = (postType) => {
    let currentTime = new Date();
    let lastUpdate = this.props.posts[this.props.client.id][postType].lastUpdated;
    let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

    if (minsDiff > 2) {
      this.postList.getWrappedInstance()._onRefresh(postType);
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    let postType = POST_TYPES.RECEIVED;

    if (this.props.currentScreen === 'RecentScreen') {
      postType = POST_TYPES.PUBLIC;
    } else if (this.props.currentScreen === 'FollowingScreen') {
      postType = POST_TYPES.FOLLOWED;
    }

    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <PostListContainer
          ref={(ref) => this.postList = ref}
          userId={this.props.client.id}
          postType={postType}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default PostScreen;
