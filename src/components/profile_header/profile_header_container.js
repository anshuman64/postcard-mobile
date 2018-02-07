// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ProfileHeader                                                                                             from './profile_header.js';
import { createFriendRequest, acceptFriendRequest, acceptFriendshipRequest, deleteFriendship, removeFriendship } from '../../actions/friendship_actions.js';
import { createFollow, deleteFollow }                                                                            from '../../actions/follow_actions.js';
import { refreshCredsAndGetImage }                                                                               from '../../actions/image_actions.js';
import { navigateTo }                                                                                            from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, imagesCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  imagesCache: imagesCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createFriendRequest:     (authToken, firebaseUserObj, userId, username) => dispatch(createFriendRequest(authToken, firebaseUserObj, userId, username)),
  acceptFriendRequest:     (authToken, firebaseUserObj, userId) => dispatch(acceptFriendRequest(authToken, firebaseUserObj, userId)),
  acceptFriendshipRequest: (acceptedFriendship) => dispatch(acceptFriendshipRequest(acceptedFriendship)),
  deleteFriendship:        (authToken, firebaseUserObj, userId) => dispatch(deleteFriendship(authToken, firebaseUserObj, userId)),
  removeFriendship:        (deletedFriendship) => dispatch(removeFriendship(deletedFriendship)),
  createFollow:            (authToken, firebaseUserObj, followeeId) => dispatch(createFollow(authToken, firebaseUserObj, followeeId)),
  deleteFollow:            (authToken, firebaseUserObj, followeeId) => dispatch(deleteFollow(authToken, firebaseUserObj, followeeId)),
  refreshCredsAndGetImage: (firebaseUserObj, avatarUrl) => dispatch(refreshCredsAndGetImage(firebaseUserObj, avatarUrl)),
  navigateTo:              (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileHeader);
