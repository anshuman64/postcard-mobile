// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import PostListContainer  from '../../components/post_list/post_list_container';
import { POST_TYPES }     from '../../actions/post_actions';
import { UTILITY_STYLES } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Optional Screen Props:
  tab (bool): false = 'Authored' tab, true = 'Liked' tab
*/
class ProfileScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    let username = this.props.usersCache[this.props.client.id] ? this.props.usersCache[this.props.client.id].username : null;
    let avatarUrl = this.props.usersCache[this.props.client.id] ? this.props.usersCache[this.props.client.id].avatar_url : null;

    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <PostListContainer
          ref={(ref) => this.postList = ref}
          screen={'ProfileScreen'}
          userId={this.props.client.id}
          username={username}
          avatarUrl={avatarUrl}
          tab={this.props.tab}
          postType={this.props.tab ? POST_TYPES.LIKED : POST_TYPES.AUTHORED}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ProfileScreen;
