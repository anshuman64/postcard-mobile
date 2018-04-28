// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoadingScreen                              from './loading_screen';
import { loginClient }                            from '../../actions/client_actions';
import { getPosts }                               from '../../actions/post_actions';
import { getFriendships, getFriendsFromContacts } from '../../actions/friendship_actions';
import * as ContactActions                        from '../../actions/contact_actions';
import { getConversations }                       from '../../actions/message_actions';
import { getCircles }                             from '../../actions/circle_actions';
import { getBlockedUsers }                        from '../../actions/block_actions';
import { getPhotos }                              from '../../actions/image_actions';
import { navigateTo }                             from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, contactsCache, navigation }, ownProps) => ({
  client:        client,
  usersCache:    usersCache,
  contactsCache: contactsCache,
  currentScreen: navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:              (screen, props)                                                                  => dispatch(navigateTo(screen, props)),
  loginClient:             (firebaseUserObj)                                                                => dispatch(loginClient(firebaseUserObj)),
  getPosts:                (authToken, firebaseUserObj, isRefresh, userId, postType, isClient, queryParams) => dispatch(getPosts(authToken, firebaseUserObj, isRefresh, userId, postType, isClient, queryParams)),
  getFriendships:          (authToken, firebaseUserObj, friendType)                                         => dispatch(getFriendships(authToken, firebaseUserObj, friendType)),
  getContacts:             (clientPhoneNumber)                                                              => dispatch(ContactActions.getContacts(clientPhoneNumber)),
  getContactsWithAccounts: (authToken, firebaseUserObj, contactPhoneNumbers)                                => dispatch(ContactActions.getContactsWithAccounts(authToken, firebaseUserObj, contactPhoneNumbers)),
  getOtherContacts:        (authToken, firebaseUserObj, contactPhoneNumbers)                                => dispatch(ContactActions.getOtherContacts(authToken, firebaseUserObj, contactPhoneNumbers)),
  getFriendsFromContacts:  (authToken, firebaseUserObj, clientPhoneNumber)                                  => dispatch(getFriendsFromContacts(authToken, firebaseUserObj, clientPhoneNumber)),
  getConversations:        (authToken, firebaseUserObj)                                                     => dispatch(getConversations(authToken, firebaseUserObj)),
  getCircles:              (authToken, firebaseUserObj)                                                     => dispatch(getCircles(authToken, firebaseUserObj)),
  getBlockedUsers:         (authToken, firebaseUserObj)                                                     => dispatch(getBlockedUsers(authToken, firebaseUserObj)),
  getPhotos:               ()                                                                               => dispatch(getPhotos()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
