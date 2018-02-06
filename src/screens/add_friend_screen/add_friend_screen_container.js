// Library Imports
import { connect } from 'react-redux';

// Local Imports
import AddFriendScreen         from './add_friend_screen.js';
import { createFriendRequest } from '../../actions/friendship_actions.js';
import { navigateTo, goBack }  from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ client }, ownProps) => ({
  client:        client,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createFriendRequest: (authToken, firebaseUserObj, userId, username) => dispatch(createFriendRequest(authToken, firebaseUserObj, userId, username)),
  navigateTo:          (screen, props) => dispatch(navigateTo(screen, props)),
  goBack:              (props) => dispatch(goBack(props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFriendScreen);
