// Library Imports
import { connect } from 'react-redux';

// Local Imports
import AuthoredPostsTab  from './authored_posts_tab.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ posts, navigation }, ownProps) => ({
  authoredPosts: posts.authoredPosts,
  currentScreen: navigation.currentScreen
});

export default connect(
  mapStateToProps,
)(AuthoredPostsTab);
