// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostListItem                from './post_list_item.js';
import { deletePost }              from '../../actions/post_actions.js';
import { createLike, deleteLike }  from '../../actions/like_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  authToken: user.authToken,
  user:      user.user
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createLike: (authToken, likeObj) => dispatch(createLike(authToken, likeObj)),
  deleteLike: (authToken, postId) => dispatch(deleteLike(authToken, postId)),
  deletePost: (authToken, postId) => dispatch(deletePost(authToken, postId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListItem);
