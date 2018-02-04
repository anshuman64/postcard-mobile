// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostList                    from './post_list.js';
import { getPosts, refreshPosts }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts, postsCache }, ownProps) => ({
  authToken:       user.authToken,
  firebaseUserObj: user.firebaseUserObj,
  user:            user.user,
  posts:           posts,
  postsCache:      postsCache
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getPosts:         (authToken, firebaseUserObj, userId, postType, isUser, queryParams) => dispatch(getPosts(authToken, firebaseUserObj, userId, postType, isUser, queryParams)),
  refreshPosts:     (authToken, firebaseUserObj, userId, postType, isUser, queryParams) => dispatch(refreshPosts(authToken, firebaseUserObj, userId, postType, isUser, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {withRef: true}
)(PostList);
