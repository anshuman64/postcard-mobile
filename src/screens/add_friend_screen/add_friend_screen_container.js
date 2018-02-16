// Library Imports
import { connect } from 'react-redux';

// Local Imports
import AddFriendScreen         from './add_friend_screen';
import { createFriendRequest } from '../../actions/friendship_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client }, ownProps) => ({
  client: client,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createFriendRequest: (authToken, firebaseUserObj, userId, username) => dispatch(createFriendRequest(authToken, firebaseUserObj, userId, username)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFriendScreen);
