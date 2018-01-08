// Library Imports
import { connect } from 'react-redux';

// Local Imports
import AvatarScreen            from './avatar_screen.js';
import { editAvatar }          from '../../actions/user_actions.js';
import { navigateTo, goBack }  from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  user:            user.user,
  authToken:       user.authToken,
  firebaseUserObj: user.firebaseUserObj,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editAvatar: (authToken, firebaseUserObj, avatarUrl) => dispatch(editAvatar(authToken, firebaseUserObj, avatarUrl)),
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
  goBack:     (props) => dispatch(navigateTo(props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarScreen);
