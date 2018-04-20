// Library Imports
import { connect } from 'react-redux';

// Local Imports
import MessagesScreen                 from './messages_screen';
import { getMessages, createMessage } from '../../actions/message_actions';
import { getUsersFromGroup }          from '../../actions/group_actions';
import { navigateTo }                 from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, groupsCache, imagesCache, messages }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  groupsCache: groupsCache,
  imagesCache: imagesCache,
  messages:    messages
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getMessages:   (authToken, firebaseUserObj, isNew, convoId, queryParams) => dispatch(getMessages(authToken, firebaseUserObj, isNew, convoId, queryParams)),
  getUsersFromGroup: (authToken, firebaseUserObj, convoId) => dispatch(getUsersFromGroup(authToken, firebaseUserObj, convoId)),
  createMessage: (authToken, firebaseUserObj, clientId, convoId, messageBody, messageImagePath, messageImageType, postId) => dispatch(createMessage(authToken, firebaseUserObj, clientId, convoId, messageBody, messageImagePath, messageImageType, postId)),
  navigateTo:    (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessagesScreen);
