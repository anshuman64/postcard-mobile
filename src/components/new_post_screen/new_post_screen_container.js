// Library Imports
import { connect } from 'react-redux';

// Local Imports
import NewPostScreen   from './new_post_screen.js';
import { createPost }  from '../../actions/post_actions.js';
import { goBack }      from '../../actions/navigation_actions.js';
import { getCurrentRoute }  from '../../utilities/function_utility.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, nav }, ownProps) => ({
  authToken: user.authToken,
  currentScreen: getCurrentRoute(nav),
  lastScreen: nav.lastScreen,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPost: (authToken, postObj) => dispatch(createPost(authToken, postObj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostScreen);
