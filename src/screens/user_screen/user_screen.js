// Library Imports
import React     from 'react';
import RN        from 'react-native';

// Local Imports
import HeaderContainer    from '../../components/header/header_container';
import PostListContainer  from '../../components/post_list/post_list_container';
import { POST_TYPES }     from '../../actions/post_actions';
import { UTILITY_STYLES } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Optional Screen Props:
  tab (bool): false = 'Authored' tab, true = 'Liked' tab
*/
class UserScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Refresh AuthoredPosts and LikedPosts on mount
  componentDidMount() {
    this.postList.getWrappedInstance().refresh(POST_TYPES.AUTHORED);
    this.postList.getWrappedInstance().refresh(POST_TYPES.LIKED);
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    let username = this.props.usersCache[this.props.userId] ? this.props.usersCache[this.props.userId].username : null;

    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <HeaderContainer backIcon={true} backTitle={username + "'s Profile"} noBorder={true} />
        <PostListContainer
          ref={(ref) => this.postList = ref}
          screen={'UserScreen'}
          userId={this.props.userId}
          tab={this.props.tab}
          postType={this.props.tab ? POST_TYPES.LIKED : POST_TYPES.AUTHORED}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default UserScreen;
