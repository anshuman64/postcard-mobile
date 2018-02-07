// Library Imports
import { connect } from 'react-redux';

// Local Imports
import FriendListItem                                                                       from './friend_list_item.js';
import { acceptFriendRequest, acceptFriendshipRequest, deleteFriendship, removeFriendship } from '../../actions/friendship_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  acceptFriendRequest:     (authToken, firebaseUserObj, userId) => dispatch(acceptFriendRequest(authToken, firebaseUserObj, userId)),
  acceptFriendshipRequest: (acceptedFriendship) => dispatch(acceptFriendshipRequest(acceptedFriendship)),
  deleteFriendship:        (authToken, firebaseUserObj, userId) => dispatch(deleteFriendship(authToken, firebaseUserObj, userId)),
  removeFriendship:        (deletedFriendship) => dispatch(removeFriendship(deletedFriendship)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendListItem);
