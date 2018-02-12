// Library Imports
import { connect } from 'react-redux';

// Local Imports
import FriendListItem         from './friend_list_item.js';
import { navigateToMessages } from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, imagesCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  imagesCache: imagesCache
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateToMessages: (props) => dispatch(navigateToMessages(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendListItem);
