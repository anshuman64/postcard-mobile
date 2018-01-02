// Library Imports
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

// Local Imports
import AuthoredPostsTab  from './authored_posts_tab.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts }, ownProps) => ({
  authoredPosts: posts.authoredPosts,
  currentScreen: Actions.currentScene
});

export default connect(
  mapStateToProps,
)(AuthoredPostsTab);
