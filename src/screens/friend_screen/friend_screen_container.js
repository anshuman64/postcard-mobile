// Library Imports
import { connect } from 'react-redux';

// Local Imports
import FriendScreen  from './friend_screen.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ user, posts, navigation }, ownProps) => ({
  // user:          user.user,
  // posts:         posts,
  currentScreen: navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editUsername: (authToken, firebaseUserObj, username) => dispatch(editUsername(authToken, firebaseUserObj, username)),
  navigateTo:   (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendScreen);
