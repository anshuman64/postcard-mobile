// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostListItem                from './post_list_item.js';
import { deletePost, removePost }  from '../../actions/post_actions.js';
import { createLike, deleteLike }  from '../../actions/like_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  authToken:       user.authToken,
  firebaseUserObj: user.firebaseUserObj,
  user:            user.user
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createLike: (authToken, firebaseUserObj, likeObj) => dispatch(createLike(authToken, firebaseUserObj, likeObj)),
  deleteLike: (authToken, firebaseUserObj, postId) => dispatch(deleteLike(authToken, firebaseUserObj, postId)),
  deletePost: (authToken, firebaseUserObj, postId) => dispatch(deletePost(authToken, firebaseUserObj, postId)),
  removePost: (deletedPost) => dispatch(removePost(deletedPost)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListItem);
