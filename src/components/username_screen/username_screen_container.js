// Library Imports
import { connect } from 'react-redux';

// Local Imports
import UsernameScreen          from './username_screen.js';
import { editUsername }        from '../../actions/user_actions.js';
import { navigateTo, goBack }  from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  user:            user.user,
  authToken:       user.authToken,
  firebaseUserObj: user.firebaseUserObj,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editUsername: (authToken, firebaseUserObj, username) => dispatch(editUsername(authToken, firebaseUserObj, username)),
  navigateTo:   (screen, props) => dispatch(navigateTo(screen, props)),
  goBack:       (props) => dispatch(navigateTo(props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsernameScreen);
