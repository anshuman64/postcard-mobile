// Library Imports
import { connect } from 'react-redux';

// Local Imports
import FriendScreen   from './friend_screen.js';
import { navigateTo } from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, friendships }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  friendships: friendships,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:   (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendScreen);
