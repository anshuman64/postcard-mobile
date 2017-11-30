// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoginScreen from './login_screen.js';
import { signInWithPhoneNumber } from '../../actions/user_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ phoneNumber, confirmationCodeObj }, ownProps) => ({
  phoneNumber: phoneNumber,
  confirmationCodeObj: confirmationCodeObj
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  signInWithPhoneNumber: (phoneNumber) => dispatch(signInWithPhoneNumber(phoneNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
