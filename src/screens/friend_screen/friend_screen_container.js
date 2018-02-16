// Library Imports
import { connect } from 'react-redux';

// Local Imports
import FriendScreen   from './friend_screen';
import { navigateTo } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, friendships, blocks }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  friendships: friendships,
  blocks:      blocks,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:   (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendScreen);
