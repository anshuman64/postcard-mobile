// Library Imports
import { connect } from 'react-redux';

// Local Imports
import FriendListItem                                                 from './friend_list_item.js';
import { createFriendRequest, acceptFriendRequest, deleteFriendship } from '../../actions/friendship_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ client, usersCache, imagesCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  imagesCache: imagesCache
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createFriendRequest: (authToken, firebaseUserObj, userId) => dispatch(createFriendRequest(authToken, firebaseUserObj, userId)),
  acceptFriendRequest: (authToken, firebaseUserObj, userId) => dispatch(acceptFriendRequest(authToken, firebaseUserObj, userId)),
  deleteFriendship:    (authToken, firebaseUserObj, userId) => dispatch(deleteFriendship(authToken, firebaseUserObj, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendListItem);
