// Library Imports
import { connect } from 'react-redux';

// Local Imports
import UserAuthoredScreen from './user_authored_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ usersCache, groupsCache, contactsCache }, ownProps) => ({
  usersCache: usersCache,
  groupsCache:   groupsCache,
  contactsCache: contactsCache,
});

export default connect(
  mapStateToProps,
)(UserAuthoredScreen);
