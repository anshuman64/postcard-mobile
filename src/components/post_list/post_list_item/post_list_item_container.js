// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostListItem                from './post_list_item.js';
import { refreshAuthToken }        from '../../../actions/user_actions.js';
import { deletePost, removePost }  from '../../../actions/post_actions.js';
import { createLike, deleteLike }  from '../../../actions/like_actions.js';
import { navigateToProfile }       from '../../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  authToken:       user.authToken,
  firebaseUserObj: user.firebaseUserObj,
  user:            user.user
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createLike:        (authToken, firebaseUserObj, userId, likeObj) => dispatch(createLike(authToken, firebaseUserObj, userId, likeObj)),
  deleteLike:        (authToken, firebaseUserObj, userId, postId) => dispatch(deleteLike(authToken, firebaseUserObj, userId, postId)),
  deletePost:        (authToken, firebaseUserObj, userId, postId) => dispatch(deletePost(authToken, firebaseUserObj, userId, postId)),
  removePost:        (deletedPost) => dispatch(removePost(deletedPost)),
  refreshAuthToken:  (firebaseUserObj, func, ...params) => dispatch(refreshAuthToken(firebaseUserObj, func, ...params)),
  navigateToProfile: (props) => dispatch(navigateToProfile(props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListItem);
