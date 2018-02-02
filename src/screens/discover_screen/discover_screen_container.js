// Library Imports
import { connect } from 'react-redux';

// Local Imports
import DiscoverScreen  from './discover_screen.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ user, posts, navigation }, ownProps) => ({
  user:          user.user,
  posts:         posts,
  currentScreen: navigation.currentScreen
});

export default connect(
  mapStateToProps,
)(DiscoverScreen);
