// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConfirmCodeScreen                                            from './confirm_code_screen';
import { getConfirmationCode, verifyConfirmationCode, loginClient } from '../../actions/client_actions';
import { getFriendships }                                           from '../../actions/friendship_actions';
import { getPosts }                                                 from '../../actions/post_actions';
import { getBlockedUsers }                                          from '../../actions/block_actions';
import { navigateTo }                                               from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:     client,
  usersCache: usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getConfirmationCode:    (phoneNumber) => dispatch(getConfirmationCode(phoneNumber)),
  verifyConfirmationCode: (confirmationCodeObj, inputtedCode) => dispatch(verifyConfirmationCode(confirmationCodeObj, inputtedCode)),
  loginClient:            (firebaseUserObj) => dispatch(loginClient(firebaseUserObj)),
  getPosts:               (authToken, firebaseUserObj, isRefresh, userId, postType, isClient, queryParams) => dispatch(getPosts(authToken, firebaseUserObj, isRefresh, userId, postType, isClient, queryParams)),
  getFriendships:         (authToken, firebaseUserObj, friendType) => dispatch(getFriendships(authToken, firebaseUserObj, friendType)),
  getBlockedUsers:        (authToken, firebaseUserObj) => dispatch(getBlockedUsers(authToken, firebaseUserObj)),
  navigateTo:             (screen, props) => dispatch(navigateTo(screen, props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCodeScreen);
