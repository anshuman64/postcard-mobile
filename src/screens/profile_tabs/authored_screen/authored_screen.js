// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import PostListContainer  from '../../../components/post_list/post_list_container';
import { POST_TYPES }     from '../../../actions/post_actions';
import { UTILITY_STYLES } from '../../../utilities/style_utility';

//--------------------------------------------------------------------//

class AuthoredScreen extends React.PureComponent {

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
          isProfile={true}
          userId={this.props.client.id}
          username={username}
          avatarUrl={avatarUrl}
          postType={POST_TYPES.AUTHORED}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default AuthoredScreen;
