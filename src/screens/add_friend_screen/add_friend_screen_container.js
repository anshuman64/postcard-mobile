// Library Imports
import { connect } from 'react-redux';

// Local Imports
import AddFriendScreen                                from './add_friend_screen';
import { createFriendRequest, sendFriendshipRequest } from '../../actions/friendship_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client }, ownProps) => ({
  client: client,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createFriendRequest:   (authToken, firebaseUserObj, userId, username) => dispatch(createFriendRequest(authToken, firebaseUserObj, userId, username)),
  sendFriendshipRequest: (sentFriendship) => dispatch(sendFriendshipRequest(sentFriendship)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFriendScreen);
