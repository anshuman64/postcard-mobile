// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoadingScreen           from './loading_screen.js';
import { attemptToLoginUser }  from '../../actions/user_actions.js';
import { navigateTo } from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

// TODO: what is ownProps?
const mapStateToProps = ({ user }, ownProps) => ({
  phoneNumber:      user.phoneNumber,
  firebaseUserObj:  user.firebaseUserObj,
  authToken:        user.authToken,
  user:             user.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  attemptToLoginUser: (successCallback, errorCallback) => dispatch(attemptToLoginUser(successCallback, errorCallback)),
  navigateTo: (screen) => dispatch(navigateTo(screen)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
