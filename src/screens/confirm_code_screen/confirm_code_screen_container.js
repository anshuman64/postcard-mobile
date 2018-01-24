// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConfirmCodeScreen                                           from './confirm_code_screen.js';
import { getConfirmationCode, verifyConfirmationCode, loginUser }  from '../../actions/user_actions.js';
import { navigateTo }                                              from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  user:                 user.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getConfirmationCode:    (phoneNumber) => dispatch(getConfirmationCode(phoneNumber)),
  verifyConfirmationCode: (confirmationCodeObj, inputtedCode) => dispatch(verifyConfirmationCode(confirmationCodeObj, inputtedCode)),
  loginUser:              (firebaseUserObj) => dispatch(loginUser(firebaseUserObj)),
  navigateTo:             (screen, props) => dispatch(navigateTo(screen, props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCodeScreen);
