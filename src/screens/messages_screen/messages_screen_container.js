// Library Imports
import { connect } from 'react-redux';

// Local Imports
import MessagesScreen                 from './messages_screen';
import { getMessages, createMessage } from '../../actions/message_actions';
import { navigateTo }                 from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, groupsCache, contactsCache, messages }, ownProps) => ({
  client:        client,
  usersCache:    usersCache,
  groupsCache:   groupsCache,
  contactsCache: contactsCache,
  messages:      messages
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getMessages:   (authToken, firebaseUserObj, isNew, convoId, queryParams)                                                => dispatch(getMessages(authToken, firebaseUserObj, isNew, convoId, queryParams)),
  createMessage: (authToken, firebaseUserObj, clientId, convoId, messageBody, messageMedium, postId) => dispatch(createMessage(authToken, firebaseUserObj, clientId, convoId, messageBody, messageMedium, postId)),
  navigateTo:    (screen, props)                                                                                          => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessagesScreen);
