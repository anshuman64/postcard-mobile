// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ShareScreen  from './share_screen.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ user, posts, navigation }, ownProps) => ({
  user:          user.user,
  posts:         posts,
  currentScreen: navigation.currentScreen
});

export default connect(
  mapStateToProps,
)(ShareScreen);
