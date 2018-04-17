// Library Imports
import { connect } from 'react-redux';

// Local Imports
import FollowingScreen  from './following_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, posts, navigation }, ownProps) => ({
  client:        client,
  posts:         posts,
  currentScreen: navigation.currentScreen
});

export default connect(
  mapStateToProps,
)(FollowingScreen);
