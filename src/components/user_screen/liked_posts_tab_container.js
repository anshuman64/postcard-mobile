// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LikedPostsTab      from './liked_posts_tab.js';
import { getLikedPosts }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts, postsCache }, ownProps) => ({
  authToken:   user.authToken,
  likedPosts:  posts.likedPosts,
  postsCache:  postsCache
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getLikedPosts: (authToken, isRefresh, queryParams) => dispatch(getLikedPosts(authToken, isRefresh, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikedPostsTab);
