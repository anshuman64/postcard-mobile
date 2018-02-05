// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConfirmCodeScreen                                           from './confirm_code_screen.js';
import { getConfirmationCode, verifyConfirmationCode, loginClient }  from '../../actions/client_actions.js';
import { navigateTo }                                              from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ client }, ownProps) => ({
  client: client.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getConfirmationCode:    (phoneNumber) => dispatch(getConfirmationCode(phoneNumber)),
  verifyConfirmationCode: (confirmationCodeObj, inputtedCode) => dispatch(verifyConfirmationCode(confirmationCodeObj, inputtedCode)),
  loginClient:              (firebaseUserObj) => dispatch(loginClient(firebaseUserObj)),
  navigateTo:             (screen, props) => dispatch(navigateTo(screen, props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCodeScreen);
