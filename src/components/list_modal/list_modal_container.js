// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ListModal         from './list_modal';
import { createMessage } from '../../actions/message_actions';
import { navigateTo }    from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, groupsCache, contactsCache }, ownProps) => ({
  client:        client,
  usersCache:    usersCache,
  groupsCache:   groupsCache,
  contactsCache: contactsCache
});
''
const mapDispatchToProps = (dispatch, ownProps) => ({
  createMessage: (authToken, firebaseUserObj, clientId, convoId, messageBody, messageMediaPath, messageMediaType, postId) => dispatch(createMessage(authToken, firebaseUserObj, clientId, convoId, messageBody, messageMediaPath, messageMediaType, postId)),
  navigateTo:    (screen, props)                                                                                          => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListModal);
