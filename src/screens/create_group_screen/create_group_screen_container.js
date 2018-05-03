// Library Imports
import { connect } from 'react-redux';

// Local Imports
import CreateGroupScreen from './create_group_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ friendships, groupsCache, contacts, contactsCache, usersCache }, ownProps) => ({
  friendships:   friendships,
  groupsCache:   groupsCache,
  contacts:      contacts,
  contactsCache: contactsCache,
  usersCache:    usersCache,
});

export default connect(
  mapStateToProps
)(CreateGroupScreen);
