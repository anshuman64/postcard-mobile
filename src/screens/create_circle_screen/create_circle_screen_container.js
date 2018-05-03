// Library Imports
import { connect } from 'react-redux';

// Local Imports
import CreateCircleScreen from './create_circle_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ conversations, usersCache, groupsCache, contactsCache }, ownProps) => ({
  conversations:   conversations.conversations,
  groupsCache:     groupsCache,
  contactsCache:   contactsCache,
  usersCache:      usersCache,
});

export default connect(
  mapStateToProps
)(CreateCircleScreen);
