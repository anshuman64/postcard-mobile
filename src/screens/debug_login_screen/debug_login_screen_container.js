// Library Imports
import { connect } from 'react-redux';

// Local Imports
import DebugLoginScreen    from './debug_login_screen';
import { debugSignIn }     from '../../actions/client_actions';
import { getPosts }        from '../../actions/post_actions';
import { getFriendships }  from '../../actions/friendship_actions';
import { getBlockedUsers } from '../../actions/block_actions';
import { navigateTo }      from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:     client,
  usersCache: usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  debugSignIn:     (email, password) => dispatch(debugSignIn(email, password)),
  getPosts:               (authToken, firebaseUserObj, isRefresh, userId, postType, isClient, queryParams) => dispatch(getPosts(authToken, firebaseUserObj, isRefresh, userId, postType, isClient, queryParams)),
  getFriendships:  (authToken, firebaseUserObj, friendType, clientPhoneNumber) => dispatch(getFriendships(authToken, firebaseUserObj, friendType, clientPhoneNumber)),
  getBlockedUsers: (authToken, firebaseUserObj) => dispatch(getBlockedUsers(authToken, firebaseUserObj)),
  navigateTo:      (screen, props) => dispatch(navigateTo(screen, props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebugLoginScreen);
