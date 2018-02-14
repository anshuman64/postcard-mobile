// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostListItem                    from './post_list_item.js';
import { deletePost, removePost }      from '../../actions/post_actions.js';
import { createLike, deleteLike }      from '../../actions/like_actions.js';
import { createFlag, deleteFlag }      from '../../actions/flag_actions.js';
import { createFollow, deleteFollow }  from '../../actions/follow_actions.js';
import { navigateToMessages }          from '../../actions/navigation_actions.js';
import { refreshCredsAndGetImage }     from '../../actions/image_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, imagesCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  imagesCache: imagesCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createFollow:            (authToken, firebaseUserObj, followeeId) => dispatch(createFollow(authToken, firebaseUserObj, followeeId)),
  deleteFollow:            (authToken, firebaseUserObj, followeeId) => dispatch(deleteFollow(authToken, firebaseUserObj, followeeId)),
  createLike:              (authToken, firebaseUserObj, clientId, postId) => dispatch(createLike(authToken, firebaseUserObj, clientId, postId)),
  deleteLike:              (authToken, firebaseUserObj, clientId, postId) => dispatch(deleteLike(authToken, firebaseUserObj, clientId, postId)),
  createFlag:              (authToken, firebaseUserObj, postId) => dispatch(createFlag(authToken, firebaseUserObj, postId)),
  deleteFlag:              (authToken, firebaseUserObj, postId) => dispatch(deleteFlag(authToken, firebaseUserObj, postId)),
  deletePost:              (authToken, firebaseUserObj, postId) => dispatch(deletePost(authToken, firebaseUserObj, postId)),
  removePost:              (deletedPost) => dispatch(removePost(deletedPost)),
  navigateToMessages:      (props) => dispatch(navigateToMessages(props)),
  refreshCredsAndGetImage: (firebaseUserObj, avatarUrl) => dispatch(refreshCredsAndGetImage(firebaseUserObj, avatarUrl)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListItem);
