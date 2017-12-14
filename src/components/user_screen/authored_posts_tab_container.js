// Library Imports
import { connect } from 'react-redux';

// Local Imports
import AuthoredPostsTab                  from './authored_posts_tab.js';
import { getPosts, refreshAndGetPosts }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts, postsCache }, ownProps) => ({
  authToken:     user.authToken,
  authoredPosts: posts.authoredPosts,
  postsCache:    postsCache
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getPosts:           (authToken, postType, queryParams) => dispatch(getPosts(authToken, postType, queryParams)),
  refreshAndGetPosts: (authToken, postType, queryParams) => dispatch(refreshAndGetPosts(authToken, postType, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthoredPostsTab);
