// Library Imports
import { connect } from 'react-redux';

// Local Imports
import CreateGroupScreen from './create_group_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ friendships, groupsCache, contacts, contactsCache }, ownProps) => ({
  friendships:   friendships,
  groupsCache:   groupsCache,
  contacts:      contacts,
  contactsCache: contactsCache
});

export default connect(
  mapStateToProps
)(CreateGroupScreen);
