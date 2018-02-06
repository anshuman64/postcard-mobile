// Library Imports
import { connect } from 'react-redux';

// Local Imports
import FriendListItem                                                                                            from './friend_list_item.js';
import { createFriendRequest, acceptFriendRequest, acceptFriendshipRequest, deleteFriendship, removeFriendship } from '../../actions/friendship_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ client, usersCache, imagesCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  imagesCache: imagesCache
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createFriendRequest:     (authToken, firebaseUserObj, userId, username) => dispatch(createFriendRequest(authToken, firebaseUserObj, userId, username)),
  acceptFriendRequest:     (authToken, firebaseUserObj, userId) => dispatch(acceptFriendRequest(authToken, firebaseUserObj, userId)),
  acceptFriendshipRequest: (acceptedFriendship) => dispatch(acceptFriendshipRequest(acceptedFriendship)),
  deleteFriendship:        (authToken, firebaseUserObj, userId) => dispatch(deleteFriendship(authToken, firebaseUserObj, userId)),
  removeFriendship:        (deletedFriendship) => dispatch(removeFriendship(deletedFriendship)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendListItem);
