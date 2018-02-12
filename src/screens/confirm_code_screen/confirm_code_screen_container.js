// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConfirmCodeScreen                                            from './confirm_code_screen.js';
import { getConfirmationCode, verifyConfirmationCode, loginClient } from '../../actions/client_actions.js';
import { getFriendships }                                           from '../../actions/friendship_actions.js';
import { getBlockedUsers }                                          from '../../actions/block_actions.js';
import { navigateTo }                                               from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:     client,
  usersCache: usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getConfirmationCode:    (phoneNumber) => dispatch(getConfirmationCode(phoneNumber)),
  verifyConfirmationCode: (confirmationCodeObj, inputtedCode) => dispatch(verifyConfirmationCode(confirmationCodeObj, inputtedCode)),
  loginClient:            (firebaseUserObj) => dispatch(loginClient(firebaseUserObj)),
  getFriendships:         (authToken, firebaseUserObj, friendType) => dispatch(getFriendships(authToken, firebaseUserObj, friendType)),
  getBlockedUsers:        (authToken, firebaseUserObj) => dispatch(getBlockedUsers(authToken, firebaseUserObj)),
  navigateTo:             (screen, props) => dispatch(navigateTo(screen, props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCodeScreen);
