// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoadingScreen                      from './loading_screen';
import { loginClient }                    from '../../actions/client_actions';
import { getFriendships }                 from '../../actions/friendship_actions';
import { getBlockedUsers }                from '../../actions/block_actions';
import { navigateTo, navigateToMessages } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:     client,
  usersCache: usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:         (screen, props) => dispatch(navigateTo(screen, props)),
  loginClient:        (firebaseUserObj) => dispatch(loginClient(firebaseUserObj)),
  getFriendships:     (authToken, firebaseUserObj, friendType) => dispatch(getFriendships(authToken, firebaseUserObj, friendType)),
  getBlockedUsers:    (authToken, firebaseUserObj) => dispatch(getBlockedUsers(authToken, firebaseUserObj)),
  navigateToMessages: (props) => dispatch(navigateToMessages(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
