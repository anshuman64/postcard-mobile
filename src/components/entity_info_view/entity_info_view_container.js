// Library Imports
import { connect } from 'react-redux';

// Local Imports
import EntityInfoView from './entity_info_view';

//--------------------------------------------------------------------//

const mapStateToProps = ({ usersCache, groupsCache, contactsCache }, ownProps) => ({
  usersCache:    usersCache,
  groupsCache:   groupsCache,
  contactsCache: contactsCache,
});

export default connect(
  mapStateToProps
)(EntityInfoView);
