// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConfirmCodeScreen from './confirm_code_screen.js';
import { signInWithPhoneNumber } from '../../actions/user_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  phoneNumber: user.phoneNumber,
  confirmationCodeObj: user.confirmationCodeObj
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  signInWithPhoneNumber: (phoneNumber) => dispatch(signInWithPhoneNumber(phoneNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCodeScreen);
