// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import PostListContainer  from '../../components/post_list/post_list_container';
import { POST_TYPES }     from '../../actions/post_actions';
import { UTILITY_STYLES } from '../../utilities/style_utility';

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
          postType={this.state.postType}
          setParentState={this.setParentState}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ProfileScreen;
