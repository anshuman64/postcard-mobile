// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LikedPostsTab  from './liked_posts_tab.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ posts, navigation }, ownProps) => ({
  likedPosts:    posts.likedPosts,
  currentScreen: navigation.currentScreen
});

export default connect(
  mapStateToProps,
)(LikedPostsTab);
