// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostList       from './post_list.js';
import { getPosts }   from '../../actions/post_actions.js';
import { navigateTo } from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, posts, postsCache }, ownProps) => ({
  client:     client,
  posts:      posts,
  postsCache: postsCache
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getPosts:   (authToken, firebaseUserObj, isRefresh, userId, postType, isUser, queryParams) => dispatch(getPosts(authToken, firebaseUserObj, isRefresh, userId, postType, isUser, queryParams)),
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {withRef: true}
)(PostList);
