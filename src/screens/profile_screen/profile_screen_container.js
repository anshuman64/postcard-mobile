// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ProfileScreen  from './profile_screen.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, posts, navigation }, ownProps) => ({
  client:        client,
  usersCache:    usersCache,
  posts:         posts,
  currentScreen: navigation.currentScreen
});

export default connect(
  mapStateToProps,
)(ProfileScreen);
