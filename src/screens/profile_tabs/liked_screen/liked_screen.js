// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import PostListContainer  from '../../../components/post_list/post_list_container';
import { POST_TYPES }     from '../../../actions/post_actions';
import { UTILITY_STYLES } from '../../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
*/
class LikedScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    let client = this.props.usersCache[this.props.client.id];
    let username = client ? client.username : null;
    let avatarUrl = client ? client.avatar_url : null;

    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <PostListContainer
          ref={(ref) => this.postList = ref}
          isProfile={true}
          userId={this.props.client.id}
          username={username}
          avatarUrl={avatarUrl}
          postType={POST_TYPES.LIKED}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default LikedScreen;
