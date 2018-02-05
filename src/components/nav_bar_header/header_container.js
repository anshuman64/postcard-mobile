// Library Imports
import { connect } from 'react-redux';

// Local Imports
import Header                  from './header.js';
import { refreshAuthToken }    from '../../actions/client_actions.js';
import { createPost }          from '../../actions/post_actions.js';
import { navigateTo, goBack }  from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ client }, ownProps) => ({
  client:          client.user,
  authToken:       client.authToken,
  firebaseUserObj: client.firebaseUserObj,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPost:       (authToken, firebaseUserObj, userId, postBody, postImagePath, postImageType, placeholderText) => dispatch(createPost(authToken, firebaseUserObj, userId, postBody, postImagePath, postImageType, placeholderText)),
  navigateTo:       (screen, props) => dispatch(navigateTo(screen, props)),
  goBack:           (props) => dispatch(goBack(props)),
  goBackTo:         (screen, props) => dispatch(goBackTo(screen, props)),
  refreshAuthToken: (firebaseUserObj, func, ...params) => dispatch(refreshAuthToken(firebaseUserObj, func, ...params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
