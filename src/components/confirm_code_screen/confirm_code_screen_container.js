// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConfirmCodeScreen                                                                                    from './confirm_code_screen.js';
import { getConfirmationCode, verifyConfirmationCode, getAuthToken, createUser, debugGetConfirmationCode }  from '../../actions/user_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  phoneNumber: user.phoneNumber,
  confirmationCodeObj: user.confirmationCodeObj,
  firebaseUserObj: user.firebaseUserObj,
  authToken: user.authToken,
  user: user.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getConfirmationCode: (phoneNumber) => dispatch(getConfirmationCode(phoneNumber)),
  verifyConfirmationCode: (confirmationCodeObj, inputtedCode) => dispatch(verifyConfirmationCode(confirmationCodeObj, inputtedCode)),
  getAuthToken: (firebaseUserObj) => dispatch(getAuthToken(firebaseUserObj)),
  createUser: (phoneNumber, authToken) => dispatch(createUser(phoneNumber, authToken)),
  debugGetConfirmationCode: (phoneNumber) => dispatch(debugGetConfirmationCode(phoneNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCodeScreen);
