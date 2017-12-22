// Library Imports
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

// Local Imports
import LikedPostsTab     from './liked_posts_tab.js';
import { refreshPosts }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts }, ownProps) => ({
  authToken:            user.authToken,
  likedPosts:           posts.likedPosts,
  currentScreen: Actions.currentScene
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshPosts: (authToken, postType, queryParams) => dispatch(refreshPosts(authToken, postType, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikedPostsTab);
