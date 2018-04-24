// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ListModal         from './list_modal';
import { createMessage } from '../../actions/message_actions';
import { navigateTo }    from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client }, ownProps) => ({
  client: client,
});
''
const mapDispatchToProps = (dispatch, ownProps) => ({
  createMessage: (authToken, firebaseUserObj, clientId, convoId, messageBody, messageImagePath, messageImageType, postId) => dispatch(createMessage(authToken, firebaseUserObj, clientId, convoId, messageBody, messageImagePath, messageImageType, postId)),
  navigateTo:    (screen, props)                                                                                          => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListModal);
