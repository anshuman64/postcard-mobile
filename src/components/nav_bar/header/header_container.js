// Library Imports
import { connect } from 'react-redux';

// Local Imports
import Header                  from './header.js';
import { createPost }          from '../../../actions/post_actions.js';
import { navigateTo, goBack }  from '../../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, navigation }, ownProps) => ({
  authToken:       user.authToken,
  firebaseUserObj: user.firebaseUserObj,
  currentScreen:   navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPost: (authToken, firebaseUserObj, postObj) => dispatch(createPost(authToken, firebaseUserObj, postObj)),
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
  goBack:     () => dispatch(goBack())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
