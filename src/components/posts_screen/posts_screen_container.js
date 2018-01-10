// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostsScreen                 from './posts_screen.js';
import { refreshAuthToken }        from '../../actions/user_actions.js';
import { getPosts, refreshPosts }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts, postsCache, navigation }, ownProps) => ({
  authToken:       user.authToken,
  firebaseUserObj: user.firebaseUserObj,
  user:            user.user,
  posts:           posts,
  postsCache:      postsCache,
  currentScreen:   navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getPosts:         (authToken, firebaseUserObj, userId, postType, queryParams) => dispatch(getPosts(authToken, firebaseUserObj, userId, postType, queryParams)),
  refreshPosts:     (authToken, firebaseUserObj, userId, postType, queryParams) => dispatch(refreshPosts(authToken, firebaseUserObj, userId, postType, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsScreen);
