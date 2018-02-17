// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostList       from './post_list';
import { getPosts }   from '../../actions/post_actions';
import { navigateTo } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, posts, postsCache }, ownProps) => ({
  client:     client,
  posts:      posts,
  postsCache: postsCache
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getPosts:   (authToken, firebaseUserObj, isRefresh, userId, postType, isClient, queryParams) => dispatch(getPosts(authToken, firebaseUserObj, isRefresh, userId, postType, isClient, queryParams)),
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {withRef: true}
)(PostList);
