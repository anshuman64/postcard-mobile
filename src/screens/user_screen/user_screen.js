// Library Imports
import React     from 'react';
import RN        from 'react-native';

// Local Imports
import HeaderContainer    from '../../components/header/header_container.js';
import PostListContainer  from '../../components/post_list/post_list_container.js';
import { POST_TYPES }     from '../../actions/post_actions.js';
import { UTILITY_STYLES } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


class UserScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      postType:   POST_TYPES.AUTHORED,
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Refresh AuthoredPosts and LikedPosts on mount
  componentDidMount() {
    this.postList.getWrappedInstance().refresh();
    this.postList.getWrappedInstance().refresh(POST_TYPES.LIKED);
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
        <HeaderContainer backIcon={true} backTitle={this.props.usersCache[this.props.userId].username + "'s Profile"} noBorder={true} />
        <PostListContainer
          ref={(ref) => this.postList = ref}
          screen={'UserScreen'}
          userId={this.props.userId}
          postType={this.state.postType}
          setParentState={this.setParentState}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default UserScreen;
