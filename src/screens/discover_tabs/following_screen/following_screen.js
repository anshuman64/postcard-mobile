// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import PostListContainer  from '../../../components/post_list/post_list_container';
import { POST_TYPES }     from '../../../actions/post_actions';
import { UTILITY_STYLES } from '../../../utilities/style_utility';

//--------------------------------------------------------------------//

class FollowingScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Auto-refresh screen if coming back to it after > 2 minutes
  componentWillReceiveProps(nextProps) {
    if (this.props.currentScreen != 'FollowingScreen' && nextProps.currentScreen === 'FollowingScreen') {
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
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <PostListContainer
          ref={(ref) => this.postList = ref}
          userId={this.props.client.id}
          postType={POST_TYPES.FOLLOWED}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default FollowingScreen;
