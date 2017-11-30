// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoginScreen from './login_screen.js';
import { signInUserWithPhoneNumber } from '../../actions/user_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ phoneNumber, confirmationCodeObj }, ownProps) => ({
  phone: phoneNumber,
  confirm: confirmationCodeObj
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  signInUserWithPhoneNumber: (phoneNumber) => dispatch(signInUserWithPhoneNumber(phoneNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
