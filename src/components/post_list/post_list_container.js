// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostList  from './post_list.js';
import { getPosts, refreshAndGetPosts }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts, postsCache }, ownProps) => ({
  authToken:  user.authToken,
  postsCache: postsCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getPosts: (authToken, postType, queryParams) => dispatch(getPosts(authToken, postType, queryParams)),
  refreshAndGetPosts: (authToken, postType, queryParams) => dispatch(refreshAndGetPosts(authToken, postType, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
