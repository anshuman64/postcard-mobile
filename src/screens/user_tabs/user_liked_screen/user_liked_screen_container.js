// Library Imports
import { connect } from 'react-redux';

// Local Imports
import UserLikedScreen from './user_liked_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ usersCache, groupsCache, contactsCache }, ownProps) => ({
  usersCache: usersCache,
  groupsCache:   groupsCache,
  contactsCache: contactsCache,
});

export default connect(
  mapStateToProps,
)(UserLikedScreen);
