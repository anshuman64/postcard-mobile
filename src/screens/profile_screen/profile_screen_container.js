// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ProfileScreen  from './profile_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, posts }, ownProps) => ({
  client:        client,
  usersCache:    usersCache,
  posts:         posts,
});

export default connect(
  mapStateToProps,
)(ProfileScreen);
