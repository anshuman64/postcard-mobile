// Library Imports
import { connect } from 'react-redux';

// Local Imports
import CreateGroupScreen from './create_group_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ friendships, groupsCache }, ownProps) => ({
  friendships: friendships,
  groupsCache: groupsCache,
});

export default connect(
  mapStateToProps
)(CreateGroupScreen);
