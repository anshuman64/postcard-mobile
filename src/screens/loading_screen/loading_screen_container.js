// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoadingScreen      from './loading_screen.js';
import { loginClient }    from '../../actions/client_actions.js';
import { getFriendships } from '../../actions/friendship_actions.js';
import { getBlockedUsers } from '../../actions/block_actions.js';
import { navigateTo }     from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:     client,
  usersCache: usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:     (screen, props) => dispatch(navigateTo(screen, props)),
  loginClient:    (firebaseUserObj) => dispatch(loginClient(firebaseUserObj)),
  getFriendships: (authToken, firebaseUserObj, friendType) => dispatch(getFriendships(authToken, firebaseUserObj, friendType)),
  getBlockedUsers: (authToken, firebaseUserObj) => dispatch(getBlockedUsers(authToken, firebaseUserObj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
