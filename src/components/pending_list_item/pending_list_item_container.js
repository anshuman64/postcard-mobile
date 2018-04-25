// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PendingListItem              from './pending_list_item';
import * as FriendshipActions       from '../../actions/friendship_actions';
import { deleteBlock, removeBlock } from '../../actions/block_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, contactsCache }, ownProps) => ({
  client:        client,
  usersCache:    usersCache,
  contactsCache: contactsCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createFriendRequest:     (authToken, firebaseUserObj, userId, username) => dispatch(FriendshipActions.createFriendRequest(authToken, firebaseUserObj, userId, username)),
  sendFriendshipRequest:   (sentFriendship)                               => dispatch(FriendshipActions.sendFriendshipRequest(sentFriendship)),
  acceptFriendRequest:     (authToken, firebaseUserObj, userId)           => dispatch(FriendshipActions.acceptFriendRequest(authToken, firebaseUserObj, userId)),
  acceptFriendshipRequest: (acceptedFriendship)                           => dispatch(FriendshipActions.acceptFriendshipRequest(acceptedFriendship)),
  deleteFriendship:        (authToken, firebaseUserObj, userId)           => dispatch(FriendshipActions.deleteFriendship(authToken, firebaseUserObj, userId)),
  removeFriendship:        (deletedFriendship)                            => dispatch(FriendshipActions.removeFriendship(deletedFriendship)),
  deleteBlock:             (authToken, firebaseUserObj, blockeeId)        => dispatch(deleteBlock(authToken, firebaseUserObj, blockeeId)),
  removeBlock:             (deletedBlock)                                 => dispatch(removeBlock(deletedBlock)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingListItem);
