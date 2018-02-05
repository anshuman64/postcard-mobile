// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ProfileScreen  from './profile_screen.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, posts, navigation }, ownProps) => ({
  client:        client.user,
  posts:         posts,
  currentScreen: navigation.currentScreen
});

export default connect(
  mapStateToProps,
)(ProfileScreen);
