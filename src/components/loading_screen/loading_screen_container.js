// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoadingScreen           from './loading_screen.js';
import { loginUser }  from '../../actions/user_actions.js';
import { navigateTo } from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//


const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
  loginUser: (firebaseUserObj) => dispatch(loginUser(firebaseUserObj))
});

export default connect(
  null,
  mapDispatchToProps
)(LoadingScreen);
