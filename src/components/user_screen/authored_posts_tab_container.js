// Library Imports
import { connect } from 'react-redux';

// Local Imports
import AuthoredPostsTab      from './authored_posts_tab.js';
import { getAuthoredPosts }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts, postsCache }, ownProps) => ({
  authToken:     user.authToken,
  authoredPosts: posts.authoredPosts,
  postsCache:    postsCache
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAuthoredPosts: (authToken, isRefresh, queryParams) => dispatch(getAuthoredPosts(authToken, isRefresh, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthoredPostsTab);
