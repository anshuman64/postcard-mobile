// Library Imports
import { connect } from 'react-redux';

// Local Imports
import FriendListItem                    from './friend_list_item';
import { navigateTo, navigateToProfile } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, postsCache, imagesCache, messages }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  postsCache:  postsCache,
  imagesCache: imagesCache,
  messages:    messages
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:         (screen, props) => dispatch(navigateTo(screen, props)),
  navigateToProfile:  (props) => dispatch(navigateToProfile(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendListItem);
