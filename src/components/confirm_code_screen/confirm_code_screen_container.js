// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConfirmCodeScreen                                from './confirm_code_screen.js';
import { getConfirmationCode, verifyConfirmationCode }  from '../../actions/user_actions.js';
import { navigateTo }                                   from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  user:                 user.user,
  confirmationCodeObj:  user.confirmationCodeObj,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getConfirmationCode:    (phoneNumber) => dispatch(getConfirmationCode(phoneNumber)),
  verifyConfirmationCode: (confirmationCodeObj, inputtedCode) => dispatch(verifyConfirmationCode(confirmationCodeObj, inputtedCode)),
  navigateTo:             (screen, props) => dispatch(navigateTo(screen, props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCodeScreen);
