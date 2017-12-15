// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConfirmCodeScreen                                                                                    from './confirm_code_screen.js';
import { getConfirmationCode, verifyConfirmationCode, getAuthToken, createUser, debugGetConfirmationCode }  from '../../actions/user_actions.js';
import { getCurrentRoute }  from '../../utilities/function_utility.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, nav }, ownProps) => ({
  phoneNumber:          user.phoneNumber,
  confirmationCodeObj:  user.confirmationCodeObj,
  firebaseUserObj:      user.firebaseUserObj,
  authToken:            user.authToken,
  user:                 user.user,
  currentScreen:      getCurrentRoute(nav),
  lastScreen: nav.lastScreen,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getConfirmationCode:       (phoneNumber) => dispatch(getConfirmationCode(phoneNumber)),
  verifyConfirmationCode:    (phoneNumber, confirmationCodeObj, inputtedCode) => dispatch(verifyConfirmationCode(phoneNumber, confirmationCodeObj, inputtedCode)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCodeScreen);
