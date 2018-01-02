// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostList                    from './post_list.js';
import { refreshAuthToken }        from '../../actions/user_actions.js';
import { getPosts, refreshPosts }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, postsCache, posts }, ownProps) => ({
  authToken:       user.authToken,
  firebaseUserObj: user.firebaseUserObj,
  postsCache:      postsCache
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getPosts:         (authToken, firebaseUserObj, postType, queryParams) => dispatch(getPosts(authToken, firebaseUserObj, postType, queryParams)),
  refreshPosts:     (authToken, firebaseUserObj, postType, queryParams) => dispatch(refreshPosts(authToken, firebaseUserObj, postType, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {withRef: true}
)(PostList);
