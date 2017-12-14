// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LikedPostsTab               from './liked_posts_tab.js';
import { getPosts, refreshPosts }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts }, ownProps) => ({
  authToken:   user.authToken,
  likedPosts:  posts.likedPosts
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshPosts: (authToken, postType, queryParams) => dispatch(refreshPosts(authToken, postType, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikedPostsTab);
