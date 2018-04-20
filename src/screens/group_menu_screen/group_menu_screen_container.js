// Library Imports
import { connect } from 'react-redux';

// Local Imports
import GroupMenuScreen   from './group_menu_screen';
import { removeGroupMember } from '../../actions/group_actions';
import { navigateTo } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, groupsCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  groupsCache: groupsCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeGroupMember: (authToken, firebaseUserObj, groupId, userId, isClient) => dispatch(removeGroupMember(authToken, firebaseUserObj, groupId, userId, isClient)),
  navigateTo:   (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupMenuScreen);
