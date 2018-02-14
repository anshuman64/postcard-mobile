// Library Imports
import { connect } from 'react-redux';

// Local Imports
import MessageListItem         from './message_list_item.js';
import { refreshCredsAndGetImage } from '../../actions/image_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, postsCache, imagesCache, messages }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  postsCache:  postsCache,
  imagesCache: imagesCache,
  messages:    messages,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshCredsAndGetImage: (firebaseUserObj, avatarUrl) => dispatch(refreshCredsAndGetImage(firebaseUserObj, avatarUrl)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageListItem);
