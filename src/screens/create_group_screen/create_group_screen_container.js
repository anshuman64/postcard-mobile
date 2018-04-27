// Library Imports
import { connect } from 'react-redux';

// Local Imports
import CreateGroupScreen from './create_group_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ friendships, groupsCache, contacts }, ownProps) => ({
  friendships: friendships,
  groupsCache: groupsCache,
  contacts:    contacts,
});

export default connect(
  mapStateToProps
)(CreateGroupScreen);
