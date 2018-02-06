// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoadingScreen      from './loading_screen.js';
import { loginClient }    from '../../actions/client_actions.js';
import { getFriendships } from '../../actions/friendship_actions.js';
import { getPosts }       from '../../actions/post_actions.js';
import { navigateTo }     from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:     client,
  usersCache: usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:     (screen, props) => dispatch(navigateTo(screen, props)),
  loginClient:    (firebaseUserObj) => dispatch(loginClient(firebaseUserObj)),
  getFriendships: (authToken, firebaseUserObj, friendType) => dispatch(getFriendships(authToken, firebaseUserObj, friendType)),
  getPosts:       (authToken, firebaseUserObj, isRefresh, userId, postType, isUser, queryParams) => dispatch(getPosts(authToken, firebaseUserObj, isRefresh, userId, postType, isUser, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
