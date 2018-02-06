// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import PostListContainer  from '../../components/post_list/post_list_container.js';
import { POST_TYPES }     from '../../actions/post_actions.js';
import { UTILITY_STYLES } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


class ProfileScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      postType:  POST_TYPES.AUTHORED,
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Auto-refresh screen if coming back to it after > 1 minute
  componentWillReceiveProps(nextProps) {
    if (this.props.currentScreen != 'ProfileScreen' && nextProps.currentScreen === 'ProfileScreen') {
      let checkRefresh = (postType) => {
        let currentTime = new Date();
        let lastUpdate = this.props.posts[this.props.client.id][postType].lastUpdated;
        let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

        if (minsDiff > 1) {
          this.postList.getWrappedInstance().refresh(postType);
        }
      }

      checkRefresh(POST_TYPES.AUTHORED);
      checkRefresh(POST_TYPES.LIKED);
    }
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  // Passed to ProfileHeader for tab switching
  setParentState = (state) => {
    let func = () => {
      this.setState(state);
    }

    return func;
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <PostListContainer
          ref={(ref) => this.postList = ref}
          screen={'ProfileScreen'}
          userId={this.props.client.id}
          username={this.props.usersCache[this.props.client.id].username}
          avatarUrl={this.props.usersCache[this.props.client.id].avatar_url}
          postType={this.state.postType}
          setParentState={this.setParentState}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ProfileScreen;
