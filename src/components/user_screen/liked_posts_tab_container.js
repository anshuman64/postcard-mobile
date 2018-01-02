// Library Imports
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

// Local Imports
import LikedPostsTab     from './liked_posts_tab.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts }, ownProps) => ({
  likedPosts:    posts.likedPosts,
  currentScreen: Actions.currentScene
});

export default connect(
  mapStateToProps,
)(LikedPostsTab);
