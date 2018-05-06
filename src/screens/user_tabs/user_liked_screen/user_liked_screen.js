// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import HeaderContainer    from '../../../components/header/header_container';
import PostListContainer  from '../../../components/post_list/post_list_container';
import { POST_TYPES }     from '../../../actions/post_actions';
import { UTILITY_STYLES } from '../../../utilities/style_utility';
import { getEntityDisplayName } from '../../../utilities/entity_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  userId (int): userId of selected user
Optional Screen Props:
  -
*/
class UserLikedScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Refresh LikedPosts on mount
  componentDidMount() {
    this.postList.getWrappedInstance().refresh(POST_TYPES.LIKED);
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <HeaderContainer backIcon={true} backTitle={getEntityDisplayName(this.props.userId, this.props.usersCache, this.props.groupsCache, this.props.contactsCache) + "'s Profile"} noBorder={true} />
        <PostListContainer
          ref={(ref) => this.postList = ref}
          isProfile={true}
          isClient={false}
          userId={this.props.userId}
          postType={POST_TYPES.LIKED}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default UserLikedScreen;
