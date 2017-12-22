// Library Imports
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

// Local Imports
import Header                  from './header.js';
import { createPost }          from '../../../actions/post_actions.js';
import { navigateTo, goBack }  from '../../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  authToken: user.authToken,
  currentScreen: Actions.currentScene
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPost: (authToken, postObj) => dispatch(createPost(authToken, postObj)),
  navigateTo: (screen) => dispatch(navigateTo(screen)),
  goBack:     () => dispatch(goBack())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
