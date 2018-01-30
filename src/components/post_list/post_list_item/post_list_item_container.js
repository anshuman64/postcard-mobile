// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostListItem                    from './post_list_item.js';
import { refreshAuthToken }            from '../../../actions/user_actions.js';
import { deletePost, removePost }      from '../../../actions/post_actions.js';
import { createLike, deleteLike }      from '../../../actions/like_actions.js';
import { createFlag, deleteFlag }      from '../../../actions/flag_actions.js';
import { createFollow, deleteFollow }  from '../../../actions/follow_actions.js';
import { navigateToProfile }           from '../../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, images }, ownProps) => ({
  authToken:       user.authToken,
  firebaseUserObj: user.firebaseUserObj,
  user:            user.user,
  images:          images,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createFollow:      (authToken, firebaseUserObj, userId, followeeId) => dispatch(createFollow(authToken, firebaseUserObj, userId, followeeId)),
  deleteFollow:      (authToken, firebaseUserObj, userId, followeeId) => dispatch(deleteFollow(authToken, firebaseUserObj, userId, followeeId)),
  createLike:        (authToken, firebaseUserObj, userId, postId) => dispatch(createLike(authToken, firebaseUserObj, userId, postId)),
  deleteLike:        (authToken, firebaseUserObj, userId, postId) => dispatch(deleteLike(authToken, firebaseUserObj, userId, postId)),
  createFlag:        (authToken, firebaseUserObj, userId, postId) => dispatch(createFlag(authToken, firebaseUserObj, userId, postId)),
  deleteFlag:        (authToken, firebaseUserObj, userId, postId) => dispatch(deleteFlag(authToken, firebaseUserObj, userId, postId)),
  deletePost:        (authToken, firebaseUserObj, userId, postId) => dispatch(deletePost(authToken, firebaseUserObj, userId, postId)),
  removePost:        (deletedPost) => dispatch(removePost(deletedPost)),
  refreshAuthToken:  (firebaseUserObj, func, ...params) => dispatch(refreshAuthToken(firebaseUserObj, func, ...params)),
  navigateToProfile: (props) => dispatch(navigateToProfile(props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListItem);
