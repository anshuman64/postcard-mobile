// Library Imports
import { connect } from 'react-redux';

// Local Imports
import DebugLoginScreen    from './debug_login_screen.js';
import { debugSignIn }     from '../../actions/client_actions.js';
import { getFriendships }  from '../../actions/friendship_actions.js';
import { getBlockedUsers } from '../../actions/block_actions.js';
import { navigateTo }      from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:     client,
  usersCache: usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  debugSignIn:     (email, password) => dispatch(debugSignIn(email, password)),
  getFriendships:  (authToken, firebaseUserObj, friendType) => dispatch(getFriendships(authToken, firebaseUserObj, friendType)),
  getBlockedUsers: (authToken, firebaseUserObj) => dispatch(getBlockedUsers(authToken, firebaseUserObj)),
  navigateTo:      (screen, props) => dispatch(navigateTo(screen, props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebugLoginScreen);
