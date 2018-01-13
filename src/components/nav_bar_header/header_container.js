// Library Imports
import { connect } from 'react-redux';

// Local Imports
import Header                  from './header.js';
import { refreshAuthToken }    from '../../actions/user_actions.js';
import { createPost }          from '../../actions/post_actions.js';
import { navigateTo, goBack }  from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, navigation }, ownProps) => ({
  user:            user.user,
  authToken:       user.authToken,
  firebaseUserObj: user.firebaseUserObj,
  currentScreen:   navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPost:       (authToken, firebaseUserObj, userId, postObj, placeholderText) => dispatch(createPost(authToken, firebaseUserObj, userId, postObj, placeholderText)),
  navigateTo:       (screen, props) => dispatch(navigateTo(screen, props)),
  goBack:           (props) => dispatch(goBack(props)),
  refreshAuthToken: (firebaseUserObj, func, ...params) => dispatch(refreshAuthToken(firebaseUserObj, func, ...params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
