// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConfirmCodeScreen                                                         from './confirm_code_screen.js';
import { getConfirmationCode, verifyConfirmationCode, debugGetConfirmationCode } from '../../actions/user_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  phoneNumber: user.phoneNumber,
  confirmationCodeObj: user.confirmationCodeObj
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getConfirmationCode: (phoneNumber) => dispatch(getConfirmationCode(phoneNumber)),
  verifyConfirmationCode: (confirmationCodeObj, inputtedCode) => dispatch(verifyConfirmationCode(confirmationCodeObj, inputtedCode)),
  debugGetConfirmationCode: (phoneNumber) => dispatch(debugGetConfirmationCode(phoneNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCodeScreen);
