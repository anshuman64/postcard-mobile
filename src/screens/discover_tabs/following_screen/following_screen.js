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
