// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostListItem                    from './post_list_item';
import { deletePost, removePost }      from '../../actions/post_actions';
import { createLike, deleteLike }      from '../../actions/like_actions';
import { createFlag, deleteFlag }      from '../../actions/flag_actions';
import { createMessage }               from '../../actions/message_actions';
import { navigateTo }                  from '../../actions/navigation_actions';
import { refreshCredsAndGetImage }     from '../../actions/image_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, groupsCache, contactsCache, imagesCache }, ownProps) => ({
  client:        client,
  usersCache:    usersCache,
  groupsCache:   groupsCache,
  contactsCache: contactsCache,
  imagesCache:   imagesCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createLike:              (authToken, firebaseUserObj, clientId, postId)                                                           => dispatch(createLike(authToken, firebaseUserObj, clientId, postId)),
  deleteLike:              (authToken, firebaseUserObj, clientId, postId)                                                           => dispatch(deleteLike(authToken, firebaseUserObj, clientId, postId)),
  createFlag:              (authToken, firebaseUserObj, postId)                                                                     => dispatch(createFlag(authToken, firebaseUserObj, postId)),
  deleteFlag:              (authToken, firebaseUserObj, postId)                                                                     => dispatch(deleteFlag(authToken, firebaseUserObj, postId)),
  deletePost:              (authToken, firebaseUserObj, postId)                                                                     => dispatch(deletePost(authToken, firebaseUserObj, postId)),
  removePost:              (deletedPost)                                                                                            => dispatch(removePost(deletedPost)),
  createMessage:           (authToken, firebaseUserObj, clientId, convoId, messageBody, messageMediaPath, messageMediaType, postId) => dispatch(createMessage(authToken, firebaseUserObj, clientId, convoId, messageBody, messageMediaPath, messageMediaType, postId)),
  navigateTo:              (screen, props)                                                                                          => dispatch(navigateTo(screen, props)),
  refreshCredsAndGetImage: (firebaseUserObj, avatarUrl)                                                                             => dispatch(refreshCredsAndGetImage(firebaseUserObj, avatarUrl)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListItem);
