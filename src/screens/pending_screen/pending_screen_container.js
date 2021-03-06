// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PendingScreen  from './pending_screen';
import { navigateTo } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, contacts, contactsCache, friendships, blocks }, ownProps) => ({
  client:        client,
  usersCache:    usersCache,
  contacts:      contacts,
  contactsCache: contactsCache,
  friendships:   friendships,
  blocks:        blocks,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingScreen);
