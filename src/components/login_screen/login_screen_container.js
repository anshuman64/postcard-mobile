// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoginScreen                                                        from './login_screen.js';
import { getConfirmationCodeAndChangeScreens, debugGetConfirmationCode }  from '../../actions/user_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  phoneNumber: user.phoneNumber,
  confirmationCodeObj: user.confirmationCodeObj
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getConfirmationCodeAndChangeScreens: (phoneNumber) => dispatch(getConfirmationCodeAndChangeScreens(phoneNumber)),
  debugGetConfirmationCode: (phoneNumber) => dispatch(debugGetConfirmationCode(phoneNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
