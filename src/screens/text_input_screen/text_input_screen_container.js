// Library Imports
import { connect } from 'react-redux';

// Local Imports
import TextInputScreen                                from './text_input_screen';
import { editUsername }                               from '../../actions/client_actions';
import { createFriendRequest, sendFriendshipRequest } from '../../actions/friendship_actions';
import { editGroupName }                              from '../../actions/group_actions';
import { navigateTo, goBack }                         from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, navigation }, ownProps) => ({
  client:        client,
  currentScreen: navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editUsername: (authToken, firebaseUserObj, username) => dispatch(editUsername(authToken, firebaseUserObj, username)),
  createFriendRequest:   (authToken, firebaseUserObj, userId, username) => dispatch(createFriendRequest(authToken, firebaseUserObj, userId, username)),
  sendFriendshipRequest: (sentFriendship) => dispatch(sendFriendshipRequest(sentFriendship)),
  editGroupName:         (authToken, firebaseUserObj, groupId, name) => dispatch(editGroupName(authToken, firebaseUserObj, groupId, name)),
  navigateTo:   (screen, props) => dispatch(navigateTo(screen, props)),
  goBack:       (props) => dispatch(goBack(props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextInputScreen);
