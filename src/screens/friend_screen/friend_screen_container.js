// Library Imports
import { connect } from 'react-redux';

// Local Imports
import FriendScreen   from './friend_screen.js';
import { navigateTo } from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ user }, ownProps) => ({
  user:          user.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editUsername: (authToken, firebaseUserObj, username) => dispatch(editUsername(authToken, firebaseUserObj, username)),
  navigateTo:   (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendScreen);
