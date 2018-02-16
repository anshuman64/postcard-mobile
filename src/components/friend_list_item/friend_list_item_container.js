// Library Imports
import { connect } from 'react-redux';

// Local Imports
import FriendListItem                            from './friend_list_item.js';
import { navigateToMessages, navigateToProfile } from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, postsCache, imagesCache, messages }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  postsCache:  postsCache,
  imagesCache: imagesCache,
  messages:    messages
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateToMessages: (props) => dispatch(navigateToMessages(props)),
  navigateToProfile:  (props) => dispatch(navigateToProfile(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendListItem);
