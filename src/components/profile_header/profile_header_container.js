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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileHeader);
