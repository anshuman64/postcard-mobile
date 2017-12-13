// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostListItem                from './post_list_item.js';
import { createLike, deleteLike }  from '../../actions/like_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts, postsCache }, ownProps) => ({
  authToken:     user.authToken,
  authoredPosts: posts.authoredPosts,
  postsCache:    postsCache
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createLike: (authToken, likeObj) => dispatch(createLike(authToken, likeObj)),
  deleteLike: (authToken, postId) => dispatch(deleteLike(authToken, postId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListItem);
