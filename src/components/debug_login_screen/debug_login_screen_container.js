// Library Imports
import { connect } from 'react-redux';

// Local Imports
import DebugLoginScreen   from './debug_login_screen.js';
import { debugSignIn }    from '../../actions/user_actions.js';
import { getCurrentRoute }  from '../../utilities/function_utility.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, nav }, ownProps) => ({
  phoneNumber:      user.phoneNumber,
  firebaseUserObj:  user.firebaseUserObj,
  currentScreen:      getCurrentRoute(nav),
  lastScreen: nav.lastScreen,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  debugSignIn:  (email, password) => dispatch(debugSignIn(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebugLoginScreen);
