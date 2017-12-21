// Library Imports
import { connect } from 'react-redux';

// Local Imports
import DebugLoginScreen   from './debug_login_screen.js';
import { debugSignIn }    from '../../actions/user_actions.js';
import { confirmCodeScreen } from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  phoneNumber:      user.phoneNumber,
  firebaseUserObj:  user.firebaseUserObj
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  debugSignIn: (email, password) => dispatch(debugSignIn(email, password)),
  confirmCodeScreen: () => dispatch(confirmCodeScreen())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebugLoginScreen);
