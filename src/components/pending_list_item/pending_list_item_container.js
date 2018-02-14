// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PendingListItem              from './pending_list_item.js';
import * as FriendshipActions       from '../../actions/friendship_actions.js';
import { deleteBlock, removeBlock } from '../../actions/block_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  acceptFriendRequest:     (authToken, firebaseUserObj, userId) => dispatch(FriendshipActions.acceptFriendRequest(authToken, firebaseUserObj, userId)),
  acceptFriendshipRequest: (acceptedFriendship) => dispatch(FriendshipActions.acceptFriendshipRequest(acceptedFriendship)),
  deleteFriendship:        (authToken, firebaseUserObj, userId) => dispatch(FriendshipActions.deleteFriendship(authToken, firebaseUserObj, userId)),
  removeFriendship:        (deletedFriendship) => dispatch(FriendshipActions.removeFriendship(deletedFriendship)),
  deleteBlock:             (authToken, firebaseUserObj, blockeeId) => dispatch(deleteBlock(authToken, firebaseUserObj, blockeeId)),
  removeBlock:             (deletedBlock) => dispatch(removeBlock(deletedBlock)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingListItem);
