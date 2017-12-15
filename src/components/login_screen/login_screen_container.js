// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoginScreen                                        from './login_screen.js';
import { getConfirmationCode, debugGetConfirmationCode }  from '../../actions/user_actions.js';
import { getCurrentRoute }  from '../../utilities/function_utility.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, nav }, ownProps) => ({
  phoneNumber:          user.phoneNumber,
  confirmationCodeObj:  user.confirmationCodeObj,
  currentScreen: getCurrentRoute(nav),
  lastScreen: nav.lastScreen,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getConfirmationCode:       (phoneNumber) => dispatch(getConfirmationCode(phoneNumber)),
  debugGetConfirmationCode:  (phoneNumber) => dispatch(debugGetConfirmationCode(phoneNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
