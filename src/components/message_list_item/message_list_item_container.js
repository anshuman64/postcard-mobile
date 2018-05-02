// Library Imports
import { connect } from 'react-redux';

// Local Imports
import MessageListItem             from './message_list_item';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, postsCache, mediaCache, messages }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  postsCache:  postsCache,
  mediaCache: mediaCache,
  messages:    messages,
});

export default connect(
  mapStateToProps
)(MessageListItem);
