// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostList                                     from './post_list.js';
import { getPosts, refreshPosts, stopScrollToTop }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, postsCache, posts }, ownProps) => ({
  authToken:    user.authToken,
  postsCache:   postsCache,
  scrollToTop:  posts.scrollToTop
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getPosts:        (authToken, postType, queryParams) => dispatch(getPosts(authToken, postType, queryParams)),
  refreshPosts:    (authToken, postType, queryParams) => dispatch(refreshPosts(authToken, postType, queryParams)),
  stopScrollToTop: (data) => dispatch(stopScrollToTop(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
