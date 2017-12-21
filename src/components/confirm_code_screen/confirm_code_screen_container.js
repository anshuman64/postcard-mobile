// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConfirmCodeScreen                                                                                    from './confirm_code_screen.js';
import { getConfirmationCode, verifyConfirmationCode, getAuthToken, createUser, debugGetConfirmationCode }  from '../../actions/user_actions.js';
import { navigateTo }                                                                                       from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  phoneNumber:          user.phoneNumber,
  confirmationCodeObj:  user.confirmationCodeObj,
  firebaseUserObj:      user.firebaseUserObj,
  authToken:            user.authToken,
  user:                 user.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getConfirmationCode:       (phoneNumber) => dispatch(getConfirmationCode(phoneNumber)),
  verifyConfirmationCode:    (phoneNumber, confirmationCodeObj, inputtedCode) => dispatch(verifyConfirmationCode(phoneNumber, confirmationCodeObj, inputtedCode)),
  navigateTo: (screen) => dispatch(navigateTo(screen))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCodeScreen);
