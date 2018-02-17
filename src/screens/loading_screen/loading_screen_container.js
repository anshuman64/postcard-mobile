// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoadingScreen       from './loading_screen';
import { loginClient }     from '../../actions/client_actions';
import { getPosts }        from '../../actions/post_actions';
import { getFriendships }  from '../../actions/friendship_actions';
import { getBlockedUsers } from '../../actions/block_actions';
import { navigateTo }      from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:     client,
  usersCache: usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:         (screen, props) => dispatch(navigateTo(screen, props)),
  loginClient:        (firebaseUserObj) => dispatch(loginClient(firebaseUserObj)),
  getPosts:           (authToken, firebaseUserObj, isRefresh, userId, postType, isClient, queryParams) => dispatch(getPosts(authToken, firebaseUserObj, isRefresh, userId, postType, isClient, queryParams)),
  getFriendships:     (authToken, firebaseUserObj, friendType) => dispatch(getFriendships(authToken, firebaseUserObj, friendType)),
  getBlockedUsers:    (authToken, firebaseUserObj) => dispatch(getBlockedUsers(authToken, firebaseUserObj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
