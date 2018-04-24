// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoadingScreen        from './loading_screen';
import { loginClient }      from '../../actions/client_actions';
import { getPosts }         from '../../actions/post_actions';
import { getFriendships }   from '../../actions/friendship_actions';
import { getConversations } from '../../actions/message_actions';
import { getCircles }       from '../../actions/circle_actions';
import { getBlockedUsers }  from '../../actions/block_actions';
import { navigateTo }       from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, navigation }, ownProps) => ({
  client:        client,
  usersCache:    usersCache,
  currentScreen: navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:       (screen, props)                                                                  => dispatch(navigateTo(screen, props)),
  loginClient:      (firebaseUserObj)                                                                => dispatch(loginClient(firebaseUserObj)),
  getPosts:         (authToken, firebaseUserObj, isRefresh, userId, postType, isClient, queryParams) => dispatch(getPosts(authToken, firebaseUserObj, isRefresh, userId, postType, isClient, queryParams)),
  getFriendships:   (authToken, firebaseUserObj, friendType, clientPhoneNumber)                      => dispatch(getFriendships(authToken, firebaseUserObj, friendType, clientPhoneNumber)),
  getConversations: (authToken, firebaseUserObj)                                                     => dispatch(getConversations(authToken, firebaseUserObj)),
  getCircles:       (authToken, firebaseUserObj)                                                     => dispatch(getCircles(authToken, firebaseUserObj)),
  getBlockedUsers:  (authToken, firebaseUserObj)                                                     => dispatch(getBlockedUsers(authToken, firebaseUserObj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
