// Library Imports
import { connect } from 'react-redux';

// Local Imports
import DebugLoginScreen   from './debug_login_screen.js';
import { debugSignIn }    from '../../actions/user_actions.js';
import { navigateTo }     from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapDispatchToProps = (dispatch, ownProps) => ({
  debugSignIn: (email, password) => dispatch(debugSignIn(email, password)),
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props))
});

export default connect(
  null,
  mapDispatchToProps
)(DebugLoginScreen);
