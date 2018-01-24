// Library Imports
import { connect } from 'react-redux';

// Local Imports
import HomeScreen  from './home_screen.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ user, posts, navigation }, ownProps) => ({
  user:          user.user,
  posts:         posts,
  currentScreen: navigation.currentScreen
});

export default connect(
  mapStateToProps,
)(HomeScreen);
