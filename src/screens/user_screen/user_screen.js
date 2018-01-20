// Library Imports
import React     from 'react';
import RN        from 'react-native';

// Local Imports
import HeaderContainer    from '../../components/nav_bar_header/header_container.js';
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
      isFollowed: false
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Refresh AuthoredPosts and LikedPosts on mount
  componentDidMount() {
    this.postList.getWrappedInstance().refresh();
    this.postList.getWrappedInstance().refresh(POST_TYPES.LIKED);

    if (this.props.isFollowed) {
      this.setState({ isFollowed: true })
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

  // Passed to ProfileHeader for switching follow button status
  setFollowState = (state) => {
    this.setState(state);
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container}>
        <HeaderContainer backIcon={true} backTitle={this.props.username + "'s Profile"} />
        <PostListContainer
          ref={(ref) => this.postList = ref}
          userId={this.props.userId}
          username={this.props.username}
          avatarUrl={this.props.avatarUrl}
          isFollowed={this.state.isFollowed}
          postType={this.state.postType}
          setParentState={this.setParentState}
          setFollowState={this.setFollowState}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default UserScreen;
