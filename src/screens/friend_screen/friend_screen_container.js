// Library Imports
import { connect } from 'react-redux';

// Local Imports
import FriendScreen   from './friend_screen';
import { navigateTo } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ conversations, usersCache, groupsCache, contactsCache }, ownProps) => ({
  conversations: conversations.conversations,
  usersCache:    usersCache,
  groupsCache:   groupsCache,
  contactsCache: contactsCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendScreen);
