// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConfirmCodeScreen from './confirm_code_screen.js';
import { confirmCode } from '../../actions/user_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  phoneNumber: user.phoneNumber,
  confirmationCodeObj: user.confirmationCodeObj
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  confirmCode: (confirmationCodeObj, inputtedCode) => dispatch(confirmCode(confirmationCodeObj, inputtedCode))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCodeScreen);
