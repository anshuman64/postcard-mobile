// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ProfileHeader        from './profile_header.js';
import { refreshAuthToken } from '../../actions/user_actions.js';
import { navigateTo }       from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, navigation }, ownProps) => ({
  authToken:       user.authToken,
  firebaseUserObj: user.firebaseUserObj,
  user:            user.user,
  currentScreen:   navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:       (screen, props) => dispatch(navigateTo(screen, props)),
  refreshAuthToken:  (firebaseUserObj, func, ...params) => dispatch(refreshAuthToken(firebaseUserObj, func, ...params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileHeader);
