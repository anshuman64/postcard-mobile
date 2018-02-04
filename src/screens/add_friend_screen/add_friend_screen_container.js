// Library Imports
import { connect } from 'react-redux';

// Local Imports
import AddFriendScreen         from './add_friend_screen.js';
import { editUsername }        from '../../actions/user_actions.js';
import { navigateTo, goBack }  from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, navigation }, ownProps) => ({
  user:            user.user,
  authToken:       user.authToken,
  firebaseUserObj: user.firebaseUserObj,
  currentScreen:   navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editUsername: (authToken, firebaseUserObj, username) => dispatch(editUsername(authToken, firebaseUserObj, username)),
  navigateTo:   (screen, props) => dispatch(navigateTo(screen, props)),
  goBack:       (props) => dispatch(goBack(props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFriendScreen);
