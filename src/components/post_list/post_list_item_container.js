// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostListItem                from './post_list_item.js';
import { refreshAuthToken }        from '../../actions/user_actions.js';
import { deletePost, removePost }  from '../../actions/post_actions.js';
import { createLike, deleteLike }  from '../../actions/like_actions.js';
import { navigateTo }              from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  authToken:       user.authToken,
  firebaseUserObj: user.firebaseUserObj,
  user:            user.user
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createLike:       (authToken, firebaseUserObj, likeObj) => dispatch(createLike(authToken, firebaseUserObj, likeObj)),
  deleteLike:       (authToken, firebaseUserObj, postId) => dispatch(deleteLike(authToken, firebaseUserObj, postId)),
  deletePost:       (authToken, firebaseUserObj, postId) => dispatch(deletePost(authToken, firebaseUserObj, postId)),
  removePost:       (deletedPost) => dispatch(removePost(deletedPost)),
  refreshAuthToken: (firebaseUserObj, func, ...params) => dispatch(refreshAuthToken(firebaseUserObj, func, ...params)),
  navigateTo:       (screen, props) => dispatch(navigateTo(screen, props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListItem);
