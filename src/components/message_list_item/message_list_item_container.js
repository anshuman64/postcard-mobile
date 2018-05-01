// Library Imports
import { connect } from 'react-redux';

// Local Imports
import MessageListItem             from './message_list_item';
import { refreshCredsAndGetMedium } from '../../actions/medium_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, postsCache, mediaCache, messages }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  postsCache:  postsCache,
  mediaCache: mediaCache,
  messages:    messages,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshCredsAndGetMedium: (firebaseUserObj, medium) => dispatch(refreshCredsAndGetMedium(firebaseUserObj, medium)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageListItem);
