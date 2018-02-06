// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ShareScreen  from './share_screen.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, friendships, posts, navigation }, ownProps) => ({
  client:        client.user,
  friendships:   friendships,
  posts:         posts,
  currentScreen: navigation.currentScreen
});

export default connect(
  mapStateToProps,
)(ShareScreen);
