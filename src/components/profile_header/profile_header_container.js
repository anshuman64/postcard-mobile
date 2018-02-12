// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ProfileHeader                  from './profile_header.js';
import * as FriendshipActions         from '../../actions/friendship_actions.js';
import { createFollow, deleteFollow } from '../../actions/follow_actions.js';
import { createBlock, deleteBlock }   from '../../actions/block_actions.js';
import { refreshCredsAndGetImage }    from '../../actions/image_actions.js';
import { navigateTo }                 from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, imagesCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  imagesCache: imagesCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createFriendRequest:     (authToken, firebaseUserObj, userId, username) => dispatch(FriendshipActions.createFriendRequest(authToken, firebaseUserObj, userId, username)),
  acceptFriendRequest:     (authToken, firebaseUserObj, userId) => dispatch(FriendshipActions.acceptFriendRequest(authToken, firebaseUserObj, userId)),
  acceptFriendshipRequest: (acceptedFriendship) => dispatch(FriendshipActions.acceptFriendshipRequest(acceptedFriendship)),
  deleteFriendship:        (authToken, firebaseUserObj, userId) => dispatch(FriendshipActions.deleteFriendship(authToken, firebaseUserObj, userId)),
  removeFriendship:        (deletedFriendship) => dispatch(FriendshipActions.removeFriendship(deletedFriendship)),
  createFollow:            (authToken, firebaseUserObj, followeeId) => dispatch(createFollow(authToken, firebaseUserObj, followeeId)),
  deleteFollow:            (authToken, firebaseUserObj, followeeId) => dispatch(deleteFollow(authToken, firebaseUserObj, followeeId)),
  createBlock:             (authToken, firebaseUserObj, blockeeId) => dispatch(createBlock(authToken, firebaseUserObj, blockeeId)),
  deleteBlock:             (authToken, firebaseUserObj, blockeeId) => dispatch(deleteBlock(authToken, firebaseUserObj, blockeeId)),
  refreshCredsAndGetImage: (firebaseUserObj, avatarUrl) => dispatch(refreshCredsAndGetImage(firebaseUserObj, avatarUrl)),
  navigateTo:              (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileHeader);
